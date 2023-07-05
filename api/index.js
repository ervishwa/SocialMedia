import  Express  from "express";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import likesRoutes from "./routes/likes.js";
import commentsRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

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

//a method from multer to store any file(from user).
const storage = multer.diskStorage({
    //destination
    destination: function (req, file, cb) {
      cb(null, '../socialmediaapp/public/upload')
    },
    filename: function (req, file, cb) {
      //will create a unique name

      cb(null, Date.now() + file.originalname);
    }
  })
  const upload = multer({ storage: storage });

  app.post("/upload",upload.single("file"),(req,res)=>{
    const file = req.file;
    res.status(200).json(file.filename);
  })

app.use("/user",userRoutes);
app.use("/post",postRoutes);
app.use("/like",likesRoutes);
app.use("/comment",commentsRoutes);
app.use("/auth",authRoutes);


app.listen(8800,()=>{
    console.log("API is running !");
})