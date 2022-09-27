import User from "../models/User.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../encryption.js";

export const signup = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();
    const { password, ...rest } = req.body;

    res.status(201).json(rest);
  } catch (err) {
    next(createError(err));
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({
      email,
    });

    if (!user) return next(createError(404, "User not found"));

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) return next(createError(400, "Invalid credential!"));
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const cookieOption = {
      httpOnly: true,
    };

    const { _password, ...otherUserDetail } = user._doc;
    res
      .cookie("access_token", token, cookieOption)
      .status(200)
      .json(otherUserDetail);
  } catch (error) {
    next(error);
  }
};

export const googleSignin = (req, res) => {
  res.json({
    message: "Successfull",
  });
};
