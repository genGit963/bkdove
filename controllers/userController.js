import Tweet from "../models/tweet.js";
import User from "../models/user.js";

// getUSer()
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update
export const updateUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updateUser._doc);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res
      .status(403)
      .json({ msg: "You can only update your account only.!!" });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Tweet.remove({userId:req.params.id});
      res.status(200).json({ msg: " The User is deleted Successfully. !!", ...req.user});
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }else{
    res.status(404).json({msg:"You aren't allow to delete."});
  }
};


// follow user function
export const followUnfollow = async (req, res) => {
  try {
    // friends: as follow 
    // url has friend's id: so. req.params.id contains friend's id
    const friend = await User.findById(req.params.id);
    // you: as following
    // body has your id : so req.body.id contains your id.
    const you = await User.findById(req.body.id);
    //followers and following array handling
    if (!friend.followers.includes(req.body.id)) {
      await friend.update({ $push: { followers: req.body.id } }); // you is being pushed to follower list of friend
      await you.update({ $push: { following: req.params.id} }); // friend is being pushed to following list of you/mine.
      res.status(200).json({msg:`You follow ${friend.username}!!`});
    } else {
      await friend.update({ $pull: { followers: req.body.id} }); // you is being poped from follower list of friend
      await you.update({ $pull: { following: req.params.id } }); // friend is being poped from following list of you/mine.
      res.status(401).json({msg:`${friend.username} is unfollowed!!`});
    }
  } catch (error) {
    res.status(404).json({msg:"The followUnfollow() error !!", error: error.message });
  }
};
