import express from 'express';
import { chat } from '../controllers/chatController';

const chatRoutes = express.Router();

chatRoutes.post('/', chat);

export default chatRoutes;
