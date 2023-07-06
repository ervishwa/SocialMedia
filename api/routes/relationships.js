import Express from 'express';
import{addRelationships ,getRelationships , deleteRelationships}  from "../controllers/relationship.js";

const  route =  Express.Router();

route.post('/',addRelationships);
route.get('/',getRelationships);
route.delete('/',deleteRelationships);

export default route;
    
