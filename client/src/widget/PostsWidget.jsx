import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostWidget from "./PostWidget";
import { setPosts } from "../state/index";

const PostsWidget = ({ userId, isProfile = false }) => {
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            className="rounded-lg bg-blue-600 p-4 flex flex-col gap-4"
            key={_id}
            name={`${firstName} ${lastName}`}
            postId={_id}
            postUserId={userId}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          ></PostWidget>
        )
      )}
    </>
  );
};

export default PostsWidget;
