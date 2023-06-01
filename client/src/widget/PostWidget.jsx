import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state/index";
import Friend from "../components/Friend";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";

const PostWidget = ({
  name,
  postId,
  postUserId,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked =  false; //map data structure
  const likeCount =  0; 

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ posts: updatedPost }));
  };

  return (
    <div className="rounded-lg bg-blue-600 p-4 flex flex-col gap-4">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <p className="mt-4">{description}</p>
      {picturePath && (
        <img
          className="w-full h-auto rounded-xl mt-3"
          alt="post"
          src={`http://localhost:3001/assets/${picturePath?picturePath:<img alt="not uploaded">Not uploaded</img>}`}
        ></img>
      )}
      <div className="flex flex-between mt-4 justify-between items-center">
        <div className="flex flex-between items-center justify-between gap-4">
          <div className="gap-[0.3rem] flex flex-between items-center justify-between">
            {isLiked ? (
              <div
                onClick={() => {
                  patchLike();
                }}
              >
                <AiFillHeart></AiFillHeart>
              </div>
            ) : (
              <div
                onClick={() => {
                  patchLike();
                }}
              >
                <AiOutlineHeart></AiOutlineHeart>
              </div>
            )}
          </div>
          <p>{likeCount}</p>
        </div>

        <div className="flex flex-between items-center gap-[0.3rem]">
          <div onClick={() => setIsComments(!isComments)}>
            <BsChatLeft></BsChatLeft>
          </div>

          <p>{comments.length}</p>
        </div>
      </div>
      <div>
        <AiOutlineShareAlt></AiOutlineShareAlt>
      </div>
      {isComments && (
        <div className="mt-2">
          {comments.map((comment, i) => (
            <div key={`${comment}-${i}`}>
              <p className="border-gray-500 opacity-80 bg-gradient-to-r from-yellow-200 to-cyan-500 p-[1px]"></p>
              <div className="my-2 mx-0 pl-4">{comment}</div>
            </div>
          ))}
          <p className="border-gray-500 opacity-80 bg-gradient-to-r from-yellow-200 to-cyan-500 p-[1px]"></p>
        </div>
      )}
    </div>
  );
};

export default PostWidget;
