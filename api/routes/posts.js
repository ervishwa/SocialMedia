import  Express  from "express";
import {getPosts ,addPost ,deletePost} from "../controllers/post.js";

const route = Express.Router();


route.get('/',getPosts);
route.post('/',addPost);
route.delete('/:id',deletePost);

export default route;