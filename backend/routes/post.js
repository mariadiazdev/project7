const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');
const postController = require('../controllers/post');

router.get('/all', auth, postController.getPosts);
router.get('/', auth, postController.getPost);
router.post('', auth, multer, postController.createPost);
router.put('/:id', auth, multer, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.post('/read', auth, postController.readPost);

module.exports = router;