import express from "express";
import { createBusiness } from "../controllers/form.js";
import authenticate from "../middleware/checkauth.js";
import { upload } from "../controllers/upload.js";
import deleteBusiness from "../controllers/deletebusiness.js";


const formRouter = express.Router();

formRouter.post('/business',authenticate,upload.fields( //Chequeo autenticación, subo las fotos y creo el negocio 
    [
    {name:'coverPhoto',maxCount:1},
    {name:'gallery',maxCount:10}]),createBusiness)
export default formRouter;

formRouter.delete('/delete',authenticate,deleteBusiness);