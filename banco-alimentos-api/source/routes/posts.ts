/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/posts';
const router = express.Router();
//User
router.get('/user/:userId', controller.userLogin);
router.post('/user', controller.createUser);
router.post('/post', controller.createPost);
router.get('/getPosts', controller.getPost);
router.post('/comment', controller.createComment);
router.get('/getComments', controller.getComment);



export = router;
