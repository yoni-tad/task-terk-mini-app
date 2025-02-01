const taskModel = require("../models/taskModel");

exports.addTask = async (req, res) => {
  let { title, category, userId } = req.body;

  try {
    if (!title || !category || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const storeTask = await taskModel.create({
      title: title,
      category: category,
      userId: userId,
    });

    res.status(201).json({ message: "Task added" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    if (!taskId) {
      return res.status(404).json({ message: "Task id required" });
    }

    const taskInfo = await taskModel.findById(taskId);
    if (!taskInfo) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.json(taskInfo);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, category, completed } = req.body;

  try {
    if (!taskId) {
      return res.status(404).json({ message: "Task id required" });
    }

    const taskInfo = await taskModel.findById(taskId);
    if (!taskInfo) {
      return res.status(404).json({ message: "Task not found!" });
    }

    const updateTask = await taskModel.findByIdAndUpdate(taskId, {
      title: title,
      categoryL: category,
      completed: completed,
    });

    res.status(200).json({ message: "Task updated" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    if (!taskId) {
      return res.status(404).json({ message: "Task id required" });
    }

    const taskInfo = await taskModel.findById(taskId);
    if (!taskInfo) {
      return res.status(404).json({ message: "Task not found!" });
    }

    const deleteTask = await taskModel.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task deleted" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error" });
  }
};
