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
      tags
    } = req.body;

    console.log("req body:", req.body);

    const files = req.files.map(file => file.filename);
    
    console.log("files uploaded:", files);
    console.log("req.files:", req.files);

    const newPost = new PostMessage({
      creator,
      title,
      message,
      tags,
      files
    });
    
    console.log(newPost, "regBody");

    await newPost.save();
    res.status(201).json(newPost)
    console.log("Post with files uploaded successfully!", newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
}