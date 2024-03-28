const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");

// Get all posts
router.get('/allpost', requireLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        });

});

// Create a post
router.post('/createpost', requireLogin, (req, res) => {
    const { title, body, pic } = req.body;
    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        photo: pic,
        postedBy: req.user
    });
    post.save().then(result => {
        res.json({ post: result });
    })
        .catch(err => {
            console.log(err);
        });
});

// Get my posts
router.get('/mypost', requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(mypost => {
            res.json({ mypost });
        })
        .catch(err => {
            console.log(err);
        });
});

// Like a post

router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        // push the user id to the likes array
        $push: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err });
        } else {
            res.json(result);
        }
    });
});

// Unlike a post

router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        // pull the user id from the likes array
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err });
        } else {
            res.json(result);
        }
    });
});


module.exports = router;