import  Express  from "express";
import {getPosts ,addPost} from "../controllers/post.js";

const route = Express.Router();


route.get('/',getPosts);
route.post('/',addPost);

export default route;