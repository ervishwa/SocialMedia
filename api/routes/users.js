import  Express  from "express";
import { getUser } from "../controllers/user.js";

const route = Express.Router();


route.get('/',getUser);


export default route;