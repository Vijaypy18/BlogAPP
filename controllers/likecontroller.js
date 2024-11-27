const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
    try {
        const { post, user } = req.body;

        // Validate request body
        if (!post || !user) {
            return res.status(400).json({ error: "Post ID and User are required" });
        }

        // Check if post exists
        const existingPost = await Post.findById(post);
        if (!existingPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Create and save the like
        const like = new Like({ post, user });
        const savedLike = await like.save();

        // Update the post and populate likes
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { likes: savedLike._id } },
            { new: true }
        )
        .populate("likes")
        .exec();

        // Send response
        res.json({ post: updatedPost });

    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: "Error while liking post" });
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;

        // Validate request body
        if (!post || !like) {
            return res.status(400).json({ error: "Post ID and Like ID are required" });
        }

        // Check if post exists
        const existingPost = await Post.findById(post);
        if (!existingPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Find and delete the like
        const deletedLike = await Like.findOneAndDelete({ post, _id: like });
        if (!deletedLike) {
            return res.status(404).json({ error: "Like not found" });
        }

        // Update the post and remove the like reference
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $pull: { likes: like } },
            { new: true }
        )
        .populate("likes")
        .exec();

        // Send response
        res.json({ post: updatedPost });

    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: "Error while unliking post" });
    }
};
