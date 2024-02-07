  //Mongoose Model importing (Collection)
  import PostMessage from "../models/postMessage.js";
  import mongoose from "mongoose";
  import User from "../models/user.js";

  export const getPosts = async (req, res) => {
    try {
      //Pobiera z bazy danych liste postów jednocześnie zamieniajac wartosc pola creator kazdego z postów na obiekt js (bo jest to referencja do dokumentu z innej kolekcji w Mongo - do kolekcji Userow)
      const postMessages = await PostMessage.find().populate("creator").populate("likers");

      console.log("***", postMessages);

      res.status(200).json(postMessages);

      console.log("Pobrane zasoby z mDB", postMessages);

    } catch (err) {
      res.status(404).json({ message: err.message});
      console.log(err.message);
    }
  }

export const createPost = async (req, res) => {
  try {
    const post = req.body;

    console.log("req body:", req.body);

    const files = req.files.map(file => file.filename);
    
    console.log("files uploaded:", files);
    console.log("req.files:", req.files);

    const user = await User.findOne({ _id: req.userId });//mongoosowy document, znajduje usera w kolekcji Mongo, ktory _id ma takie jak zalogowany user, req.userId to id z tokena zalogowanego usera wszczepione w postaci token do req.headers.authorization przez interceptors w api.js a nastepnie przechwycone przez middleweara auth.js, zdekodowane i wszczepione do w postaci id do req.userId

    console.log("USER Z CREATE:", user);

    const newPost = new PostMessage({
      ...post,
      creator: user._id,//mongoosowy objectId bez populate konwert na string id
      createdAt: new Date().toISOString(),
      files
    });
    
    console.log(newPost, "regBody");

    await newPost.save();

    const populatedPost = await PostMessage.findById(newPost._id).populate("creator");

    console.log("POPULATED POST:", populatedPost);

    res.status(201).json(populatedPost);

    console.log("Post with files uploaded successfully!", newPost);

  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true}).populate("creator").populate("likers");

    res.json(updatedPost);

    console.log("Post updated successfully!", updatedPost);
    
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
}

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated." });
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const post = await PostMessage.findById(_id).populate("likers").populate("creator");
    console.log("LIKE1:", post);

    const index = post.likers.findIndex((user) => String(user._id) === String(req.userId));

    console.log("INDEX:", index);

    if (index === -1) {
      const user = await User.findById(String(req.userId));
      //like post
      post.likers.push(user);
    } else {
      //dislike post
      post.likers = post.likers.filter((user) => String(user._id) !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true}).populate("likers").populate("creator");

    console.log("LIKE2:", updatedPost);

    res.json(updatedPost);

  } catch (err) {
    console.log(err);
  }
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const deletedPost = await PostMessage.findByIdAndDelete(_id);
		res.json(_id);

		console.log("Post deleted successfully!");
		console.log(deletedPost);

  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
}