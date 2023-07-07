import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
 // console.log("hsdbs");

  const q = "SELECT followerUserId FROM relationships  WHERE followedUserId = ? ";

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);

    const ans = data.map((curr) => curr.followerUserId);
    return res.status(200).json(ans);
  });
};

export const addRelationships = (req, res) => {
  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json("Not logged In !");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is Not valid !");

    const q =
      "INSERT INTO  relationships (`followerUserId`,`followedUserId`) VALUES (?, ?) ";


    db.query(q, [userInfo.id,req.body.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("following");
    });
  });
};

export const deleteRelationships = (req, res) => {
   
    const token = req.cookies.accesstoken;
    if (!token) return res.status(401).json("Not logged In !");
  
    jwt.verify(token, "secretKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is Not valid !");
  
    const q = "DELETE FROM relationships WHERE `followerUserId` = (?) AND `followedUserId` = (?) ";

   

    db.query(q,[userInfo.id,req.query.userId],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("unfollowed");
    })
    });
  };
