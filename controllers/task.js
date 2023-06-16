const Task = require('../model/tasks');
const asyncWrapper = require('../middleware/aysnc');
const { CustomError } = require('../error/customError');

const getTask = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const postTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const singleTask = asyncWrapper(async (req, res, next) => {
  const { id: ID } = req.params;

  const task = await Task.findOne({ _id: ID });

  if (!task) {
   return next(CustomError(`No task with id: ${ID}`, 404));
  }
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: ID } = req.params;

  const task = await Task.findByIdAndUpdate({ _id: ID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(CustomError(`No task with id: ${ID}`, 404));
  }
  res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: ID } = req.params;

  const task = await Task.findOneAndDelete({ _id: ID });
  const Alltask = await Task.find({});

  if (!task) {
    return next(CustomError(`No task with id: ${ID}`, 404));
  }
  res.status(201).json({ task: Alltask });
});

module.exports = {
  getTask,
  postTask,
  singleTask,
  updateTask,
  deleteTask,
};

