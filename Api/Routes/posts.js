import express from 'express'
import { addpost, deletepost, getpost, getposts, updatepost } from '../Controllers/post.js';

const router = express.Router()


router.get('/', getposts);
router.get('/:id', getpost);
router.post('/', addpost);
router.delete('/:id', deletepost);
router.put('/:id', updatepost);

export default router;