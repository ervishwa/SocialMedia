import { db } from "../connect.js";
import jwt from "jsonwebtoken";
export const getUser = (req,res)=>{
    const userId = req.params.userId;
    // const token = req.cookies.accesstoken;
    // if (!token) return res.status(401).json("Not logged In !");
  
    // jwt.verify(token, "secretKey", (err, userInfo) => {
    //   if (err) return res.status(403).json("Token is Not valid !");


      const q = "SELECT * FROM users WHERE id = ?";

      db.query(q, [userId], (err, result) => {
        if (err) return res.status(500).json(err);
        const {password,...info} = result[0];
        return res.status(200).json(info);
      });

  
  
}