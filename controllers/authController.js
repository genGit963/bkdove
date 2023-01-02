import User from "../models/User.js";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

// signup
export const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hash(req.body.password, salt);

    const newUser = new User({ ...req.body, password: passwordHash });
    await newUser.save();

    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY);

    // to hide passowrd : by destructing
    const { password, ...otherDetail } = newUser;
    res.status(200).json(...otherDetail); // response except pswd;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login fucntion
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).json({ msg: "user not found." });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: "Password Invalid !!" });
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_KEY);

    res.status(200).json(user.email);// sending email blocking pswd 

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
