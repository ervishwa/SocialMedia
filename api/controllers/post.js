import moment from "moment";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";
export const getPosts = (req, res) => {
  //console.log("hai");
  const userId = req.query.userId;
  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json("Not logged In !");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is Not valid !");

    const q =
      typeof userId !== "undefined"
        ? "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC"
        : "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC";
   

    const values =
      typeof userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json("Not logged In !");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is Not valid !");

    const q =
      "INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post created Successfully !");
    });
  });
};

export const deletePost = (req, res) => {
  console.log("dekme");
  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json("Not logged In !");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is Not valid !");

    const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ? " ;
 
    db.query(q,[req.params.id,userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("post deleted successfully !");
      return res.status(403).json("You can't delete someone other post !");
    });
  });
};
