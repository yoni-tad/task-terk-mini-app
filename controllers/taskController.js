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
  const userId = req.params.userId;

  try {
    if (!userId) {
      return res.status(404).json({ message: "User id required" });
    }

    const taskList = await taskModel.find({ userId: userId });
    if (taskList.length == 0) {
      return res.status(404).json({ message: "Tasks not found!" });
    }
    const tasks = [];
    for (const task of taskList) {
      const taskInfo = {
        id: task._id,
        title: task.title,
        category: task.category,
        completed: task.completed,
      };

      tasks.push(taskInfo);
    }

    res.json(tasks);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updateTask = await taskModel.findByIdAndUpdate(
      id,
      {
        completed: completed,
      },
      { new: true }
    );

    if (!updateTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

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
