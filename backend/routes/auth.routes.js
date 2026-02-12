import express from "express";
import { login, logOut, signUp } from "../controllers/auth.controllers.js";

const authRouter=express.Router()

authRouter.post("/signUp",signUp)
authRouter.post("/login",login)
authRouter.get("/logOut",logOut)

export default authRouter