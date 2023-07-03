import  Express  from "express";
import {login,register,logout } from "../controllers/auth.js";

const route = Express.Router();


route.post("/login",login);
route.post("/register",register);
route.post("/logout",logout);


export default route;