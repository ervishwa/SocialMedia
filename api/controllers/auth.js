import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
//import {configDotenv}  from "dotenv";
// console.log(secretKey);

//console.log(process.env.secretKey);
export const register = (req,res)=>{
    //chq user is existing user or not
    //here ? is same thing like req.body.username (? is work same like that but it provide more secuirty.)
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("user allready exist !");

    //create new user 
    //Hash the password

    const salt = bcrypt.genSaltSync(10);
    //encrypt password
    const hashedPassword = bcrypt.hashSync(req.body.password,salt);

    

    const q = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)"
    
    const values = [req.body.username,req.body.email,hashedPassword,req.body.name] ;

    db.query(q,[values],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("registration succefully !")
    })
    })

}

export const login = (req,res)=>{
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(!data.length) return res.status(404).json("user not found! please register");


        const chqPassword = bcrypt.compareSync(req.body.password,data[0].password);

       if(!chqPassword) return res.status(400).json("WRONG USERID AND PASSWORD");

       const token = jwt.sign({id:data[0].id},"secretKey");
       
       const{password,...other} = data[0];

       res
         .cookie("accesstoken",token,{
            httpOnly : true,
         })
         .status(200)
         .json(other);
    });

};

export const logout = (req,res)=>{
    res.clearCookie("accesstoken",{
        secure : true,
        sameSite : "none"
    }).status(200).json("Log out Successfully !");
}