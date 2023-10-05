/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/posts';
const router = express.Router();
//User
router.get('/user/:userId', controller.getUserById);
router.post('/user', controller.createUser);



export = router;
