const express = require("express");
const router = express.Router();

// Step 1: Controller imports
const { createComment } = require("../controllers/commentController");
const { createPost, getAllPosts } = require("../controllers/postController");
const { likePost, unlikePost } = require("../controllers/likecontroller");

// Step 2: Mapping routes
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

// Step 3: Export the router
module.exports = router;
