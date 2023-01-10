import express from "express";
import { createTweet, deleteTweet, getAllTweets, getAllYourTweets, getEveryoneTweets, getTweet, justTweet, likeDislike } from "../controllers/tweetController.js";
import { verifyToken } from "../verifyToken.js";

const tweetRoutes = express.Router();

// get Tweet
tweetRoutes.get("/:id",getTweet);

//post a tweet
tweetRoutes.post("/", verifyToken, createTweet);

//just give a tweet
tweetRoutes.post("/justTweet", justTweet);

// delete a tweet 
tweetRoutes.delete("/:id", verifyToken, deleteTweet);

// likes or dislikes
tweetRoutes.put("/:id/like", likeDislike);

// timeline tweets : includes your tweets and your followings tweets
tweetRoutes.get("/timeline/:id", getAllTweets);

// get all users tweets
tweetRoutes.get("/user/all/:id", getAllYourTweets);

//get all tweets
tweetRoutes.get("/", getEveryoneTweets);



export default tweetRoutes;