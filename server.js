import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


const app = express();
// project-built routes to controllers
import authRoutes from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import tweetRoutes from "./routers/tweetRouter.js";


// npm-packages uses
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({limit:"10mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"10mb", extended:true}));
app.use(morgan("dev"));
app.use(cookieParser());

// project-built api uses of routes from routers
app.use("/auth", authRoutes);
app.use("/user",userRouter);
app.use("/tweets",tweetRoutes);

// connection to database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGDB_URL_local, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then( 
    console.log("\n---------------------------------------\nMongodb is attached. Successfully !!"));

// port
const PORT = process.env.PORT || 6001;
app.listen(PORT, () =>
  console.log(`http://localhost:${PORT}\n---------------------------------------\n`)
);
