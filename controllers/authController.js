import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// signup
export const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: passwordHash });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY);

    // to hide passowrd : by destructing
    const { password, ...otherDetail } = newUser._doc;

    res.status(200).json({ ...otherDetail });
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

    delete user.password;
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(user);


  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
