const Task = require("../models/task");
const { connection } = require("../db");

const addTask = async (task) => {
  await Task.create(task);
  console.log("Task added");
  await connection.close();
};

const listTasks = async () => {
  const tasks = await Task.find().lean();
  console.table(
    tasks.map((task) => ({
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
    })),
  );

  await connection.close();
  process.exit(0);
};

const removeTask = async (_id) => {
  await Task.findByIdAndDelete(_id);

  console.log("Task removed");

  await connection.close();
};

const updateTask = async (_id, newTask) => {
  await Task.updateOne({ _id }, newTask);

  console.log("Task updated");

  await connection.close();
};

const findTask = async (text) => {
  const search = new RegExp(text, "i");

  const tasks = await Task.find({
    $or: [{ title: search }, { description: search }],
  });

  if (tasks.length === 0) {
    console.log("No tasks found");
    await connection.close();
    proces.exit(0);
  } else {
    console.table(tasks.map((task) => ({
        _id: task._id.toString(),
        title: task.title,
        description: task.description,
    })));
    await connection.close();
  }
};

module.exports = {
  addTask,
  listTasks,
  removeTask,
  updateTask,
  findTask,
};
