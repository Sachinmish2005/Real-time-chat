import jwt from "jsonwebtoken"

const genToken=async (userId)=>{
  try{
     return await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"2d"})
  }catch(error){
      return console.log("gen token error")
  }
}

export default genToken