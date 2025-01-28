const fs = require('fs');
const { Post } = require('../models');
const { User } = require('../models');
const { sequelize } = require('../models');
const path = require('path');

exports.createPost = async (req, res, next) => {
    try {

        const mediaUrl = req.file ? req.protocol + '://' + req.get('host') + '/media/' + getSubfolderFromPath(req.file.path) + "/" + req.file.filename : "";
        req.body.post = JSON.parse(req.body.post);

        // Create the post
        const post = await Post.create({
            title: req.body.post.title,
            message: req.body.post.message,
            mediaUrl: mediaUrl,
            userId: req.body.post.userId,
        })
        // Respond with success message
        res.status(201).json({
            message: 'Post saved successfully!'
        });
    } catch (error) {
        console.error('Error Post Failed:', error);
        res.status(500).json({
            message: 'Post Failed.',
            error: error.message
        });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const { userId } = req.query;
        console.log(`!userId = ${!userId}`);

        let posts;

        if (userId) {
            posts = await Post.findAll({
                include: [
                    {
                        model: User,
                        as: 'readers',
                        attributes: ['id'],
                        where: { id: userId },
                        required: false,
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
        } else {
            posts = await Post.findAll({
                order: [['createdAt', 'DESC']],
            });
        }


        const data = posts.map((post) => {
            const plainPost = post.get({ plain: true });
            const isRead = plainPost.readers && plainPost.readers.length > 0;
            return {
                ...plainPost,
                isRead,
            };
        });

        return res.status(200).json({ data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: error.message || 'An error occurred fetching posts.',
        });
    }
};

//Get post by id
exports.getPost = async (req, res, next) => {
    try {
        const { userId, postId } = req.query;
        //Get Post
        const post = await Post.findOne({ where: { id: postId } });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        //  Return the result
        return res.status(200).json({
            post
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: error.message || 'An error occurred fetching the post.'
        });
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        // Check for image update
        const mediaUrl = req.file ? req.protocol + '://' + req.get('host') + '/media/' + getSubfolderFromPath(req.file.path) + req.file.filename : req.body.imageUrl;
        req.body.post = JSON.parse(req.body.post);
        // Fetch post by id from DB
        const post = await Post.findOne({ where: { id: req.params.id } });
        // Update the post
        const updatedPost = await post.update({
            title: req.body.post.title,
            message: req.body.post.message,
            mediaUrl: mediaUrl,
            userId: req.body.post.userId,
        })
        // Respond with success message
        res.status(201).json({
            message: 'Post updated successfully!'
        });
    } catch (error) {
        console.error('Failed to update post:', error);
        res.status(500).json({
            message: 'Update Failed.',
            error: error.message
        });
    }
};


exports.deletePost = async (req, res, next) => {
    try {

        const post = await Post.findOne({ where: { id: req.params.id } });
        // Delete the post
        await post.destroy()
        // Respond with success message
        res.status(200).json({
            message: 'Post deleted successfully!'
        });
    } catch (error) {
        console.error('Failed to delete post:', error);
        res.status(500).json({
            message: 'Delete Failed.',
            error: error.message
        });
    }
};

exports.readPost = async (req, res, next) => {
    try {
        const { userId, postId } = req.query;
        const post = await Post.findByPk(postId);
        const user = await User.findByPk(userId);

        if (!post || !user) {
            return res.status(404).json({ message: 'Post or user not found' });
        }


        await post.addReader(user);
        res.status(200).json({
            message: 'Added userId to read'
        });
    } catch (error) {
        console.error('Failed to update:', error);
        res.status(500).json({
            message: 'Read Failed.',
            error: error.message
        });
    }
};

function getSubfolderFromPath(filePath) {
    const segments = filePath.split(path.sep);
    return segments.length > 1 ? segments[1] : '';
}