import express from "express";
import User from "../models/User.js";

/* READ  */
export const getUser = async (req, resp) => {
  try {
    /* /user/:id so params hai la liye  */
    const { id } = req.params;
    /* finding that user */
    const user = await User.findById({ id });
    ///////check later because password is also going
    resp.status(200).json(user);
  } catch (error) {
    resp.status(404).json({ message: error.message });
  }
};

/* READ */
export const getUserFriends = async (req, resp) => {
  try {
    /* /user/:id so params hai la liye  */
    const { id } = req.params;
    /* finding that user */
    const user = await User.findById({ id });

    //   finding the friends
    // new concept doubt
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
    resp.status(200).json(formattedFriends);
  } catch (error) {
    resp.status(404).json({ message: error.message });
  }
};

export const addRemoveFriend = async (req, resp) => {};
