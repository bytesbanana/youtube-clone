import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  var salt = await bcrypt.genSalt(10);

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
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

    if (!user) return next(createError(404, 'User not found'));

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return next(createError(400, 'Invalid credential!'));
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const cookieOption = {
      httpOnly: true,
    };
    res.cookie('access_token', token, cookieOption).status(200).json({
      name: user.name,
      email: user.email,
    });
    
  } catch (error) {
    next(error);
  }
};

export const googleSignin = (req, res) => {
  res.json({
    message: 'Successfull',
  });
};
