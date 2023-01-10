import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({
  userId:{
    type:String
  },
  username:{
    type:String,
  },
  description:{
    type: String,
    required:true,
    max:280,
  },
  likes:{
    type: Array,
    default:[]
  },

}, {timestamps: true});


const Tweet = mongoose.model("Tweet", TweetSchema);
export default Tweet;