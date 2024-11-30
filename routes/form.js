import express from "express";
import { createBusiness } from "../controllers/form.js";
import authenticate from "../middleware/checkauth.js";
import upload from "../middleware/multerConfig.js";
import { logout } from "../controllers/login.js";


const formRouter = express.Router();

formRouter.post('/business',authenticate,upload.fields( //Chequeo autenticación, subo las fotos y creo el negocio 
    [
    {name:'coverPhoto',maxCount:1},
    {name:'gallery',maxCount:10}]),createBusiness,logout)
export default formRouter;