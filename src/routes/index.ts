import { Router } from 'express';
import QuestionController from '../controllers/question.controller';
import RoomController from '../controllers/room.controller';

const questionController = new QuestionController();
const roomController = new RoomController();

const route = Router();

route.get('/', (req, res) => {
  res.render('index', { page: 'enter-room' });
});
route.get('/create-pass', (req, res) => {
  res.render('index', { page: 'create-pass' });
});

route.post('/room/:roomId/:questionId/:action', questionController.index);
route.post('/question/create/:roomId', questionController.create);

route.get('/room/:roomId', roomController.open);
route.post('/create-room', roomController.create);
route.post('/enter-room', roomController.enter);

export default route;
