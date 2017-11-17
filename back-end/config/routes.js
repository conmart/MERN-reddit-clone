var express = require('express');
var router = express.Router();
var textPostsController = require('../controllers/textPosts');
var commentsController = require('../controllers/comments');

//Post Routes
router.get('/api/posts', textPostsController.index);

router.post('/api/posts', textPostsController.create);

router.get('/api/posts/:id', textPostsController.show);

router.put('/api/posts/:id', textPostsController.update);

router.delete('/api/posts/:id', textPostsController.destroy);

//Comment Routes
router.get('/api/posts/:post_id/comments', commentsController.index);

router.post('/api/posts/:post_id/comments', commentsController.create);

router.get('/api/posts/:post_id/comments/:id', commentsController.commentsIndex);

router.put('/api/posts/:post_id/comments/:id', commentsController.update);

router.delete('/api/posts/:post_id/comments/:id', commentsController.destroy);

router.get('/api/comments', commentsController.allComments)

module.exports = router;
