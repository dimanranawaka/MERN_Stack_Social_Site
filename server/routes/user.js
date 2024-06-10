const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");
const User = mongoose.model("User");


router.get('/user/:id', requireLogin, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const posts = await Post.find({ postedBy: req.params.id }).populate("postedBy", "_id name");
        res.json({ user, posts });
    } catch (err) {
        console.log(err);
        return res.status(422).json({ error: err });
    }
});

router.put('/follow', requireLogin, async (req, res) => {
    try {
        const userBeingFollowed = await User.findByIdAndUpdate(req.body.followId, {
            $push: { followers: req.user._id }
        }, {
            new: true
        }).select("-password");

        const loggedInUser = await User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, { new: true }).select("-password");

        res.json(loggedInUser);
    } catch (err) {
        console.log(err);
        return res.status(422).json({ error: err });
    }
});

router.put('/unfollow', requireLogin, async (req, res) => {
    try {
        const userBeingUnfollowed = await User.findByIdAndUpdate(req.body.unfollowId, {
            $pull: { followers: req.user._id }
        }, {
            new: true
        }).select('-password');

        const loggedInUser = await User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.unfollowId }
        }, { new: true }).select('-password');

        res.json(loggedInUser);
    } catch (err) {
        console.log(err);
        return res.status(422).json({ error: err });
    }
});

module.exports = router;