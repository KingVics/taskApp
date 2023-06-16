const express = require('express');
const {
  getTask,
  postTask,
  updateTask,
  deleteTask,
  singleTask,
} = require('../controllers/task');
const router = express.Router();

router.route('/').get(getTask).post(postTask);

router.route('/:id').patch(updateTask).delete(deleteTask).get(singleTask);

module.exports = router;
