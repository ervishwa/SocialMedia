import  Express  from "express";
import {getComments , postComments} from "../controllers/comment.js";

const route = Express.Router();


route.get('/',getComments);
route.post('/',postComments);

export default route;