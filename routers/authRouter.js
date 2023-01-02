import Express from "express";
import { signup, login} from "../controllers/authController.js";


const authRoutes = Express.Router();

authRoutes.post("/signup",signup);
authRoutes.post("/login", login);

export default authRoutes;