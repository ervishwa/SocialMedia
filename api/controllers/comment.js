import moment from "moment";
import { db } from "../connect.js";
import  jwt  from "jsonwebtoken";
export const getComments = (req,res)=>{
   
    const q = `SELECT c.* , u.id AS userId ,name,profilePic FROM comments AS c JOIN users as u ON (u.id = c.userId)
    WHERE c.postId = ? ORDER BY c.createdAt DESC`;
    

    db.query(q,[req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });


}


export const postComments = (req, res) => {

  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json("Not logged In !");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is Not valid !");

  const q = "INSERT INTO comments (`desc`,`createdAt`,`userId`,`postId`) VALUES (?)";

  const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId
  ]

  db.query(q,[values],(err,data)=>{
      if(err) return res.status(500).json(err);
      return res.status(200).json("Comments created Successfully !");
  })
  });
};