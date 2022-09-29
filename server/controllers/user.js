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
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndRemove(req.params.id);
      res.status(204);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "Invalid permission"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  console.log("subscribe channel");
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
      $inc: {
        subscribers: 1,
      },
    });

    res.status(200).json("Subscription successfull");
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: {
        subscribers: -1,
      },
    });
    res.status(200).json("Unsubscription successfull");
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
