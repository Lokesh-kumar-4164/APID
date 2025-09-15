const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { number } = require("zod");
const { ref } = require("process");
// This is a working code and executed too. function calls removed to that the execution is prevented.
// code left here just to see how to perform operations and to check schema too.
dotenv.config({ path: "config.env" });

const db = process.env.DATABASE_URL;

async function connectDB() {
    const _k = await mongoose.connect(db).then(() => console.log("Connected"));
    const conn = mongoose.connection;
}

connectDB();
//Students details already inserted
const StudentSchema = new mongoose.Schema({
  name:String,
  regNo:{type:String, unique:true},
  age:Number,
  username:{type:String, unique:true},
  password:String,
  email:{type:String, unique:true}
})
const Student = mongoose.model("Student", StudentSchema);
const postSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  time: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);


async function createPosts() {
  const students = await Student.find()
  const studentMap = {}
  students.forEach((s => {
    studentMap[s.regNo] = s._id
  }))
  const posts = [
    {
      subject: "Feeling Overwhelmed with Exams",
      description: "I've been stressed out lately with all my exams and assignments. Anyone else feeling the same? How do you cope?",
      author: studentMap["23BCB8978"], 
      likes: 10,
      comments: 4
    },
    {
      subject: "Struggling with Anxiety",
      description: "Sometimes I feel anxious for no reason and it affects my studies. Would love tips on managing anxiety.",
      author: studentMap["23BCB8978"], 
      likes: 15,
      comments: 6
    },
    {
      subject: "Tips for Better Sleep",
      description: "Lately I can't sleep well and feel tired all day. Any advice for improving sleep quality?",
      author: studentMap["23BCB8975"], 
      likes: 12,
      comments: 3
    },
    {
      subject: "Feeling Low Motivation",
      description: "I have zero motivation to study or work on projects. How do you stay motivated during tough times?",
      author: studentMap["23BCB8938"], 
      likes: 18,
      comments: 5
    },
    {
      subject: "Coping with Stress",
      description: "Stress is taking a toll on me, both mentally and physically. I want to find healthy ways to deal with it.",
      author: studentMap["23BCB7684"], 
      likes: 20,
      comments: 8
    }
  ];

  await Post.insertMany(posts);
  console.log("Mental health posts inserted using regNo!");
}



const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  text: { type: String, required: true },
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  time: { type: Date, default: Date.now }
});

const Comment = mongoose.model("Comment", commentSchema);

async function createComments() {
  
  const posts = await Post.find().limit(3); 
  const students = await Student.find();

  
  const studentMap = {};
  students.forEach(s => {
    studentMap[s.regNo] = s._id;
  });

  
  const comments = [
    {
      post: posts[0]._id, 
      author: studentMap["23BCB8975"], 
      text: "I feel the same, exams have been so stressful!"
    },
    {
      post: posts[0]._id, 
      author: studentMap["23BCB8938"], 
      text: "Meditation helps me relax before exams."
    },
    {
      post: posts[1]._id, 
      author: studentMap["23BCB7684"], 
      text: "I deal with anxiety by going for a walk and listening to music."
    },
    {
      post: posts[2]._id, 
      author: studentMap["23BCB8978"], 
      text: "I struggle with sleep too, drinking warm milk sometimes helps."
    }
  ];


  const insertedComments = await Comment.insertMany(comments);

  
  const reply = {
    post: posts[0]._id,
    author: studentMap["23BCB8978"], 
    text: "Thanks for sharing, I will try meditation!",
    parentComment: insertedComments[0]._id
  };

  await Comment.create(reply);

  console.log("✅ Comments with a nested reply inserted!");
}


