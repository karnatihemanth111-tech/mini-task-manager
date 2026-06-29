import { Request, Response } from 'express';
import Task from '../models/Task';

// ─── GET all tasks ───────────────────────────────────────
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

// ─── POST create task ────────────────────────────────────
export const createTask = async (req: Request, res: Response) => {
  const { title, deadline } = req.body;

  // Input validation
  if (!title || title.trim() === '') {
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  // Deadline validation — if provided, must be a valid future date
  if (deadline) {
    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) {
      res.status(400).json({ message: 'Invalid deadline date' });
      return;
    }
    if (deadlineDate < new Date()) {
      res.status(400).json({ message: 'Deadline must be a future date' });
      return;
    }
  }

  try {
    const task = await Task.create({
      title: title.trim(),
      deadline: deadline ? new Date(deadline) : null,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

// ─── PATCH toggle completed ──────────────────────────────
export const toggleTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    task.completed = !task.completed;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating task' });
  }
};

// ─── PATCH update deadline ───────────────────────────────
export const updateDeadline = async (req: Request, res: Response) => {
  const { deadline } = req.body;

  if (!deadline) {
    res.status(400).json({ message: 'Deadline is required' });
    return;
  }

  const deadlineDate = new Date(deadline);
  if (isNaN(deadlineDate.getTime())) {
    res.status(400).json({ message: 'Invalid deadline date' });
    return;
  }

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { deadline: deadlineDate },
      { new: true }   // return updated task
    );

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating deadline' });
  }
};

// ─── DELETE task ─────────────────────────────────────────
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};