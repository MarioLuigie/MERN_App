//Mongoose Model importing (Collection)
import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
import User from "../models/user.js";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const post = await PostMessage.findById(id).populate("creator").populate("likers").populate("comments.author");

    res.status(200).json(post);

  } catch (err) {
    res.status(404).json({ message: err.message});
    console.log(err.message);
  }
}

export const getPosts = async (req, res) => {
  const { query = "", tags = "", page = 1, limit = 6 } = req.body;//get searchParams from client

  // console.log("***", req.body);

  try {
    //index pierwszego posta na danej stronie
    const startIndex = (Number(page) - 1) * limit;
    // const totalNumbOfPostMessages = await PostMessage.countDocuments({});
    let queryObject = {}; // Pusty obiekt do przechowywania warunków zapytania

    // Dodaj warunki do zapytania tylko, jeśli są dostarczone
    if (query) {
      queryObject.$or = [
        { title: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } },
        { message: { $regex: query, $options: 'i' } }
      ];
    }

    if (tags) {
      queryObject.tags = { $in: tags.split(",") };
    }

    const totalNumbOfPostMessages = await PostMessage.countDocuments(queryObject);

    // Użyj zapytania do bazy danych tylko, jeśli istnieją warunki
    const postMessages = await PostMessage.find(queryObject)
    .populate('creator')
    .populate('likers')
    .populate("comments.author")
    .sort({ _id: -1 })
    .limit(limit)
    .skip(startIndex)

    res.status(200).json({ 
      postsList: postMessages, 
      currentPage: Number(page), 
      numbOfPages: Math.ceil(totalNumbOfPostMessages / limit)
    });

    // console.log("Pobrane zasoby z mDB", postMessages);

  } catch (err) {
    res.status(404).json({ message: err.message});
    console.log(err.message);
  }
}

export const createPost = async (req, res) => {
  try {
    const post = req.body;

    // console.log("req body:", req.body);
    // console.log("tags splited:", post.tags.split(","));

    const files = req.files.map(file => `https://editorial-images.s3.eu-north-1.amazonaws.com/${file.key}`);
    
    console.log("files uploaded:", files);
    // console.log("req.files:", req.files);

    const user = await User.findOne({ _id: req.userId });//mongoosowy document, znajduje usera w kolekcji Mongo, ktory _id ma takie jak zalogowany user, req.userId to id z tokena zalogowanego usera wszczepione w postaci token do req.headers.authorization przez interceptors w api.js a nastepnie przechwycone przez middleweara auth.js, zdekodowane i wszczepione do w postaci id do req.userId

    console.log("USER Z CREATE:", user);

    const newPost = new PostMessage({
      ...post,
      creator: user._id,//mongoosowy objectId bez populate konwert na string id
      createdAt: new Date().toISOString(),
      files,
      tags: post.tags.split(",")
    });
    
    // console.log(newPost, "regBody");

    await newPost.save();

    const populatedPost = await PostMessage.findById(newPost._id).populate("creator");

    // console.log("POPULATED POST:", populatedPost);

    res.status(201).json(populatedPost);

    // console.log("Post with files uploaded successfully!", newPost);

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
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true}).populate("creator").populate("likers").populate("comments.author");

    res.json(updatedPost);

    // console.log("Post updated successfully!", updatedPost);
    
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
    const post = await PostMessage.findById(_id).populate("likers").populate("creator").populate("comments.author");
    console.log("LIKE1:", post);

    const index = post.likers.findIndex((user) => String(user._id) === String(req.userId));

    // console.log("INDEX:", index);

    if (index === -1) {
      const user = await User.findById(String(req.userId));
      //like post
      post.likers.push(user);
    } else {
      //dislike post
      post.likers = post.likers.filter((user) => String(user._id) !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true}).populate("likers").populate("creator").populate("comments.author");

    // console.log("LIKE2:", updatedPost);

    res.json(updatedPost);

  } catch (err) {
    console.log(err);
  }
}

export const commentPost = async (req, res) => {

  const { id } = req.params;
  const comment = req.body;

  console.log("REQ.BODY - COMMENT:", comment);
  // console.log("REQ.PARAMS - POST ID:", id);

  try {
    const post = await PostMessage.findById(id);

    const author = await User.findById(comment.authorId);

    // console.log("FINDED POST:", post);
    // console.log("AUTHOR POST:", author);

    comment.author = author;
    post.comments = [comment, ...post.comments]; 
    post.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
    .populate("likers")
    .populate("creator")
    .populate("comments.author");

    // console.log("UPDATED POST:", updatedPost);

    res.status(200).json(updatedPost);
    
  } catch (err) {
    console.log(err);
  }
}

export const updateComment = async (req, res) => {

  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const editedComment = req.body;


  console.log("***postId", postId);
  console.log("***commentId", commentId);
  console.log("***Content", editedComment);//ok

  try {
    const post = await PostMessage.findById(postId);

    const comments = post.comments.filter(comment => String(comment._id) !== commentId);

    console.log("^^^", comments);

    const newComments = [editedComment, ...comments];

    console.log("***new comments", newComments);

    post.comments = newComments;

    console.log("*** new Post", post);

    const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, { new: true })
    .populate("likers")
    .populate("creator")
    .populate("comments.author");

    console.log("*** updatedPost", updatedPost);

    res.status(200).json(updatedPost);

  } catch (err) {
    console.log(err);
  }
}

export const deleteComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    console.log("***postId", postId);
    console.log("***commentId", commentId);

    const post = await PostMessage.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    console.log("***post COMMENTS:", post.comments);

    const newComments = post.comments.filter(comment => String(comment._id) !== commentId);

    console.log("***NEW COMMENTS:", newComments);

    post.comments = newComments;

    const newPost = new PostMessage(post);

    await newPost.save();

    const updatedPost = await PostMessage.findById(newPost._id)
    .populate("likers")
    .populate("creator")
    .populate("comments.author");

    res.status(200).json(updatedPost);
    
  } catch (err) {
    console.log(err);
  }
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  const deleteFileFromS3 = async (key) => {
    const params = {
      Bucket: 'editorial-images', // Twój bucket
      Key: key, // Klucz pliku, np. 'folder/nazwa_pliku.jpg'
    };
  
    try {
      await s3Client.send(new DeleteObjectCommand(params));
      console.log(`Plik ${key} został usunięty z AWS S3.`);
    } catch (err) {
      console.error(`Błąd podczas usuwania pliku z AWS S3: ${err}`);
    }
  };

  const deleteFilesFromS3 = async (keys) => {
    for (const key of keys) {
      await deleteFileFromS3(key);
    }
  };

  const extractFileNames = (urls) => urls.map(url => url.split('/').pop());

  try {
    const deletedPost = await PostMessage.findByIdAndDelete(_id);

    const fileNames = extractFileNames(deletedPost.files);

    deleteFilesFromS3(fileNames);

		res.json(_id);

		// console.log("Post deleted successfully!");
		// console.log(deletedPost);

  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
}