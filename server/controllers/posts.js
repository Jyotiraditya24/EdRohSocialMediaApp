import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE Post
export const createPost = async (req, resp) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {}, //will look like-> likes: { "someID": true/false}
      comments: [],
    });
    await newPost.save();
    /* returns all the post  */
    const post = await Post.find();
    resp.status(201).json(post);
  } catch (error) {
    resp.status(409).json({ message: error.message });
  }
};

/* READ */

// get all post
export const getFeedPosts = async (req, resp) => {
  try {
    const posts = await Post.find();
    resp.status(200).json(posts);
  } catch (error) {
    resp.status(409).json({ message: error.message });
  }
};

// get user post
export const getUserPosts = async (req, resp) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    resp.status(200).json(posts);
  } catch (error) {}
};

/* UPDATE */

export const likePost = async (req, resp) => {
  const { id } = req.params;
  const { userId } = req.body;
  const post = await Post.findById(id);
  const isLiked = post.like.get(userId);
  if (isLiked) {
    post.like.delete(userId);
  } else {
    post.like.set(userId, true);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { like: post.like },
    { new: true } //a object is created
  );
  resp.status(200).json(updatedPost);
};
