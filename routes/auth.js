import express from "express";
import {loginUser,logout}from "../controllers/login.js";
import authenticate from "../middleware/checkauth.js";
import { createUser, loginAdmin } from "../controllers/admin.js";
import loginLimiter from "../middleware/limiter.js";


const loginRouter = express.Router();

loginRouter.post('/login',loginUser);
loginRouter.post('/logout',logout);
loginRouter.post('/login-admin',loginLimiter,loginAdmin);
loginRouter.post('/create-user',createUser);
loginRouter.get('/check',authenticate);


export default loginRouter;