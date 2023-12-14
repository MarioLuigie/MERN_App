  //Mongoose Model importing (Collection)
  import PostMessage from "../models/postMessage.js";

  export const getPosts = async (req, res) => {
    try {
      const postMessages = await PostMessage.find();
      res.status(200).json(postMessages);
      console.log(postMessages);
    } catch (err) {
      res.status(404).json({ message: err.message});
      console.log(err.message);
    }
  }

export const createPost = async (req, res) => {
  try {
    const { 
      creator, 
      title, 
      message, 
      tags, 
      acceptedFiles 
    } = req.body;

    const newPost = new PostMessage({
      creator,
      title,
      message,
      tags,
      acceptedFiles
    });
    
    console.log(newPost, "regBody");

    await newPost.save();
    res.status(201).json(newPost)
    console.log(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
}