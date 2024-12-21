import express from 'express';
import { getTodos, getTodoById, createTodo,updateTodo,deleteTodo } from '../controllers/toDoController.js';

const router = express.Router();

// Get all todos
router.get('/todos', getTodos);

// Get a todo by ID
router.get('/todos/:id', getTodoById);

// Create a new todo
router.post('/todos', createTodo);
//update to do
router.put("/:id", updateTodo);
//delete to do
router.delete("/:id", deleteTodo);

export default router;
