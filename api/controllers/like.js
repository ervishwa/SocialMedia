import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikesCount = (req, res) => {
 // console.log("hsdbs");

  const q = "SELECT userId FROM likes  WHERE postId = ? ";

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);

    const ans = data.map((curr) => curr.userId);
    return res.status(200).json(ans);
  });
};

export const addLike = (req, res) => {
  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json("Not logged In !");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is Not valid !");

    const q =
      "INSERT INTO likes (`userId`,`postId`) VALUES (?, ?) ";


    db.query(q, [userInfo.id,req.body.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been Liked!");
    });
  });
};

export const deleteLike = (req, res) => {
    const token = req.cookies.accesstoken;
    if (!token) return res.status(401).json("Not logged In !");
  
    jwt.verify(token, "secretKey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is Not valid !");
  
    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

    const values = [
        
        
    ]

    db.query(q,[userInfo.id,req.query.postId],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("post has been disliked !");
    })
    });
  };
