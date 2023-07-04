import  Express  from "express";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import likesRoutes from "./routes/likes.js";
import commentsRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = Express();

//middlewares
//to read the body sended by the user.
app.use(Express.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})
app.use(cors({
    origin : "http://localhost:3000",
}));
app.use(cookieParser());

app.use("/user",userRoutes);
app.use("/post",postRoutes);
app.use("/like",likesRoutes);
app.use("/comment",commentsRoutes);
app.use("/auth",authRoutes);


app.listen(8800,()=>{
    console.log("API is running !");
})