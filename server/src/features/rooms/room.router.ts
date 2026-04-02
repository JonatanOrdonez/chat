import { Router } from 'express';
import { getRoomsController, getRoomByIdController, createRoomController, deleteRoomController, createMessageController, getMessagesController } from './room.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

export const router = Router();

router.use(authMiddleware);
router.get('/', getRoomsController);
router.post('/', createRoomController);
router.get('/:id', getRoomByIdController);
router.delete('/:id', deleteRoomController);
router.get('/:id/messages', getMessagesController);
router.post('/:id/messages', createMessageController);
