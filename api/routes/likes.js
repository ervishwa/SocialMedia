import  Express  from "express";
import {getLikesCount ,addLike , deleteLike} from "../controllers/like.js";

const route = Express.Router();


route.get('/',getLikesCount);
route.post('/',addLike);
route.delete('/',deleteLike);


export default route;