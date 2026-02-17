import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import {io, getReceiverSocketId } from "../socket/socket.js";

export const sendMessage=async (req,res)=>{
  try {
    let sender = req.userId
    let {receiver}= req.params
    let {message}= req.body
    let image;
    if(req.file){
      image = await uploadOnCloudinary(req.file.path)
    }
    let conversation = await Conversation.findOne({
      participants:{$all:[sender,receiver]}
    })

    let newMessage= await Message.create({
      sender,receiver,message,image
    })
    if(!conversation){
      conversation=await Conversation.create({
        participants:[sender,receiver],
        messages:[newMessage._id]
      })

    }else{
      conversation.messages.push(newMessage._id)
      await conversation.save()
    }

    const receiverSocketId=getReceiverSocketId(receiver)
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage)
    }



    return res.status(201).json(newMessage)

  } catch (error) {
    return res.status(500).json({message:`send Message error ${error}`})
  }
}



export const getMessages = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;

    

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    }).populate("messages");

 

    if (!conversation) {
      return res.status(200).json([]);
    }

    return res.status(200).json(conversation.messages);

  } catch (error) {
    return res.status(500).json({
      message: `get Message error ${error}`
    });
  }
};


export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params
    const { type } = req.body
    const userId = req.userId

    

    const msg = await Message.findById(id)

    if (!msg) {
      return res.status(404).json({ message: "Message not found" })
    }

    // ✅ DELETE FOR EVERYONE
    if (type === "everyone") {

      if (msg.sender.toString() !== userId) {
        return res.status(403).json({ message: "Not allowed" })
      }

      msg.isDeleted = true

      await msg.save()

      // 🔥 SOCKET EMIT ONLY FOR EVERYONE
      const receiverSocketId = getReceiverSocketId(msg.receiver)
      const senderSocketId = getReceiverSocketId(userId)

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("messageDeleted", msg._id)
      }

      if (senderSocketId) {
        io.to(senderSocketId).emit("messageDeleted", msg._id)
      }

      return res.status(200).json({ success: true })
    }

    // ✅ DELETE FOR ME
    if (type === "me") {

      if (!msg.deletedFor.includes(userId)) {
        msg.deletedFor.push(userId)
      }

      await msg.save()

      // ❗ NO SOCKET EMIT HERE
      return res.status(200).json({ success: true })
    }

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const deleteFullChat = async (req, res) => {
  try {
    const userId = req.userId
    const { id: otherUserId } = req.params

    // 🔥 saare messages find jo dono ke beech hain
    await Message.updateMany(
      {
        $or: [
          { sender: userId, receiver: otherUserId },
          { sender: otherUserId, receiver: userId }
        ]
      },
      {
        $addToSet: { deletedFor: userId }
      }
    )

    return res.status(200).json({
      success: true,
      message: "Chat deleted for you"
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}


