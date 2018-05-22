const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load model
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// Load validation
const validatePostInput = require("../../validation/post");

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No post found." }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No post found." }));
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.json(err));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // Check for post owner
            if (post.user.toString() !== req.user.id) {
              return res.status(401).json({ notauthorized: "Not authorized." });
            } else {
              //Delete
              post
                .remove()
                .then(() => {
                  res.json({ success: true });
                })
                .catch(err => res.json(err));
            }
          })
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: "User already liked this post." });
            } else {
              // Add user id to likes array
              post.likes.unshift({ user: req.user.id });
              // Save to db
              post
                .save()
                .then(post => res.json(post))
                .catch(err => res.status(404).json({ notfound: "Not found." }));
            }
          })
          .catch(err => res.status(404).json({ notfound: "Not found." }));
      })
      .catch(err => res.status(404).json({ notfound: "Not found." }));
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0
            ) {
              return res
                .status(400)
                .json({ notliked: "User has not yet liked this post." });
            } else {
              // Remove user id from likes array
              // Get remove index
              const removeIndex = post.likes
                .map(item => item.user.toString())
                .indexOf(req.user.id);

              post.likes.splice(removeIndex, 1);
              // Save to db
              post
                .save()
                .then(post => res.json(post))
                .catch(err => res.status(404).json({ notfound: "Not found." }));
            }
          })
          .catch(err => res.status(404).json({ notfound: "Not found." }));
      })
      .catch(err => res.status(404).json({ notfound: "Not found." }));
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comment array
        post.comments.unshift(newComment);
        // Save to db
        post
          .save()
          .then(post => res.json(post))
          .catch(err => res.status(404).json({ notfound: "Not found." }));
      })
      .catch(err => res.status(404).json({ notfound: "Not found." }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check if the comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          res.status(404).json({ commentnotfound: "Comment not found." });
        } else {
          //Get remove index
          const removeIndex = post.likes
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);

          // Remove from comment array
          post.comments.splice(removeIndex, 1);
          // Save to db
          post
            .save()
            .then(post => res.json(post))
            .catch(err => res.status(404).json({ notfound: "Not found." }));
        }
      })
      .catch(err => res.status(404).json({ notfound: "Not found." }));
  }
);

module.exports = router;
