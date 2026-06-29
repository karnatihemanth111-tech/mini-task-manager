import { Router } from 'express';
import {
  getTasks,
  createTask,
  toggleTask,
  updateDeadline,
  deleteTask,
} from '../controllers/taskController';

const router = Router();

router.get('/',                getTasks);        // GET    /api/tasks
router.post('/',               createTask);      // POST   /api/tasks
router.patch('/:id/toggle',    toggleTask);      // PATCH  /api/tasks/:id/toggle
router.patch('/:id/deadline',  updateDeadline);  // PATCH  /api/tasks/:id/deadline
router.delete('/:id',          deleteTask);      // DELETE /api/tasks/:id

export default router;