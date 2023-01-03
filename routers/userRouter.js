import Express from "express";
import { deleteUser, followOrUnfollow, getUser, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../verifyToken.js";

const userRouter = Express.Router();

// update
userRouter.put("/:id", verifyToken, updateUser);

//get user
userRouter.get("/find/:id", getUser);

// delete User
userRouter.delete("/find/:id", verifyToken, deleteUser);

// followOrUnfollowother user
userRouter.put("/followOrUnfollow/:id", verifyToken, followOrUnfollow);


export default userRouter;