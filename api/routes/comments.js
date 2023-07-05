import  Express  from "express";
import {getComments} from "../controllers/comment.js";

const route = Express.Router();


route.get('/',getComments);


export default route;