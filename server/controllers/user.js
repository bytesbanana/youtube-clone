import { createError } from "../error.js";
import User from "../models/User.js";
import { hashPassword } from "../encryption.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const { password, ...rest } = req.body;
      let hashedPassword = undefined;
      if (password) {
        hashedPassword = await hashPassword(password);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            ...req.body,
            password: hashedPassword,
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "Invalid permission"));
  }
};

export const deleteUser = async (req, res, next) => {
  res.json({
    message: "Successfull",
  });
};

export const getUser = async (req, res, next) => {
  res.json({
    message: "Successfull",
  });
};

export const subscribe = async (req, res, next) => {
  res.json({
    message: "Successfull",
  });
};

export const unsubscribe = async (req, res, next) => {
  res.json({
    message: "Successfull",
  });
};
export const like = async (req, res, next) => {
  res.json({
    message: "Successfull",
  });
};

export const dislike = async (req, res, next) => {
  res.json({
    message: "Successfull",
  });
};
