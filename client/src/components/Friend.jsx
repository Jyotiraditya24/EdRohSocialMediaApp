import React from "react";
import UserImage from "./UserImage";
import { BsPersonFillAdd, BsPersonDash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/index";


const Friend = ({ friendId, userPicturePath, name, subtitle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends) || []; // Add a default empty array if friends is null or undefined

  const isFriend = false;

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div>
        <UserImage image={userPicturePath} className="hover:cursor-pointer" />
        <div
          className="flex flex-col"
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
        >
          <p className="font-bold"> {name}</p>
          <p className="opacity-50">{subtitle}</p>
        </div>
      </div>
      {isFriend ? (
        <BsPersonDash
          size={20}
          className="hover:cursor-pointer"
          onClick={() => patchFriend()}
        ></BsPersonDash>
      ) : (
        <BsPersonFillAdd
          size={20}
          className="hover:cursor-pointer"
          onClick={() => patchFriend()}
        ></BsPersonFillAdd>
      )}
    </div>
  );
};

export default Friend;
