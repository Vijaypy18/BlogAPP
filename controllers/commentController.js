const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
    try {
        const { post, user, body } = req.body;

        // Validate request body
        if (!post || !user || !body) {
            return res.status(400).json({ error: "Post ID, User, and Body are required" });
        }

        // Check if post exists
        const existingPost = await Post.findById(post);
        if (!existingPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Create and save comment
        const comment = new Comment({ post, user, body });
        const savedComment = await comment.save();

        // Update post and populate comments
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { comments: savedComment._id } },
            { new: true }
        )
        .populate("comments")
        .exec();

        // Send response
        res.json({ post: updatedPost });

    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: "Error while creating comments" });
    }
};
