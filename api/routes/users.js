import  Express  from "express";
import { getUser ,updateUser} from "../controllers/user.js";

const route = Express.Router();


route.get('/:userId',getUser);
route.put('/',updateUser)


export default route;