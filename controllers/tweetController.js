import Tweet from "../models/tweet.js";
import User from "../models/user.js";

// post or create tweets
export const createTweet = async (req, res) => {
  try {
    const user = await User.findOne(req.body.id);
    const newTweet = new Tweet({ ...req.body });
    await newTweet.save();
    res.status(200).json(newTweet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// just give a Tweet
export const justTweet = async(req, res) =>{
  try{
    const justTweet = new Tweet({...req.body})
    await justTweet.save();
    res.status(200).json(justTweet);
  }catch(error){
    res.status(400).json({error:error.message});
  }
}
// delete a tweet
export const deleteTweet = async (req, res) => {
  try {
    // params.id -> tweet's id and body.id -> userId
    await Tweet.findOneAndDelete(req.params.id);
    res.status(200).json({ msg: "The tweet is deleted. !!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// handle likes on tweets
export const likeDislike = async (req, res) => {
  try {
    // params.id => tweets and body.id => userId.
    // ldTweet: likeordislike tweet
    const ldTweet = await Tweet.findById(req.params.id);
    //check if user had already liked
    if (!ldTweet.likes.includes(req.body.id)) {
      await ldTweet.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json({ msg: "You liked the tweet.", ldTweet });
    } else {
      await ldTweet.updateOne({ $pull: { likes: req.body.id } });
      res.status(404).json({
        msg: "You had liked it. You can't liked more than one time. !!",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all tweets

export const getTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// timeline tweets
export const getAllTweets = async (req, res) => {
  try {
    const you = await User.findById(req.params.id);
    const yourTweets = await Tweet.find({ userId: req.params.id });
    const yourFollowingTweets = await Promise.all(
      you.following.map((followingId) => {
        return Tweet.find({ userId: followingId });
      })
    );

    res.status(200).json(yourTweets.concat(...yourFollowingTweets));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// to get all your tweets on profiles

export const getAllYourTweets = async (req, res) => {
  try {
    const yourTweets = await Tweet.find({ userId: req.params.id }).sort({createdAt:-1});
    res.status(200).json(yourTweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// getEveryone's tweest

export const getEveryoneTweets = async(req, res) =>{
  try{
    const allTweets = await Tweet.find().sort({createdAt:-1});
    res.status(200).json(allTweets);
  }catch(error){
    res.status(500).json({error:error.message});
  }
}