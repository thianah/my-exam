import Todo from "../models/toDoModel.js";

// create to do
export const createTodo = async (req, res) => {
    try {
      const { title, description, priority, dueDate } = req.body;
      
      const todo = new Todo({
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      });
  
      const savedTodo = await todo.save();
      res.status(201).json(savedTodo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// get to do
export const getTodos = async (req, res) => {
  const { search, filter, page = 1, limit = 10 } = req.query;

  const query = {};
  if (search) query.title = { $regex: search, $options: "i" };
  if (filter) query.status = filter;

  const todos = await Todo.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Todo.countDocuments(query);

  res.json({ todos, total, page });
};
// get todo by id
export const getTodoById = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res.json(todo);
};

//update to do
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(id, { $set: updates }, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

