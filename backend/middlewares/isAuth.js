import jwt from "jsonwebtoken"
const isAuth = async (req,resizeBy,next)=>{
  try{
    let token=req.cookies.token
    if(!token){
      return resizeBy.ststus(400).json({message:"token is not found"})
    }

    let verifyToken = await jwt.verify(token,process.env.JWT_SECRET)
    console.log(verifyToken)
    req.userId=verifyToken.userId
    next()
  }
  catch(erro){
    return resizeBy.status(500).json({message:`isAuth error ${error}`})
  }
}

export default isAuth