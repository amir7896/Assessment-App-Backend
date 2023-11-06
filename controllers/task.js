const Task = require("../models/task");

const { STATUS_CODE, SUCCESS_MSGS, ERROR_MSGS } = require("../constants");

const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;
    const task = new Task({ title, description, isComplete });
    await task.save();
    return res.status(STATUS_CODE.CREATED).json({
      success: true,
      message: SUCCESS_MSGS.SUCCESS_MESSAGES.TASK_CREATED,
      task_id: task._id,
    });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERROR_MSGS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const { completed } = req.query;
    let filter = {};

    if (completed !== undefined) {
      if (completed === "true") {
        filter.isComplete = true;
      } else if (completed === "false") {
        filter.isComplete = false;
      }

      const tasks = await Task.find(filter);
      return res.status(STATUS_CODE.OK).json({ success: true, data: tasks });
    } else {
      const tasks = await Task.find({});
      return res.status(STATUS_CODE.OK).json({ success: true, data: tasks });
    }
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERROR_MSGS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

const getSignleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const singleTask = await Task.findById(id);
    if (!singleTask) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, message: ERROR_MSGS.ERRORS.TASK_NOT_FOUND });
    }
    return res.status(STATUS_CODE.OK).json({ success: true, data: singleTask });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERROR_MSGS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    const singleTask = await Task.findById(id);
    if (!singleTask) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, message: ERROR_MSGS.ERRORS.TASK_NOT_FOUND });
    }
    const task = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        isComplete,
      },
      { new: true }
    );

    if (!task) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: ERROR_MSGS.ERRORS.TASK_NOT_UPDATED });
    }
    return res.status(STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MSGS.SUCCESS_MESSAGES.TASK_UPDATE,
    });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERROR_MSGS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isComplete } = req.body;
    const singleTask = await Task.findById(id);
    if (!singleTask) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, message: ERROR_MSGS.ERRORS.TASK_NOT_FOUND });
    }
    const updateComplete = await Task.findByIdAndUpdate(
      id,
      { isComplete },
      { new: true }
    );

    if (!updateComplete) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: ERROR_MSGS.ERRORS.TASK_NOT_UPDATED });
    }

    return res.status(STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MSGS.SUCCESS_MESSAGES.TASK_STATUS_UPDATE,
    });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERROR_MSGS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: ERROR_MSGS.ERRORS.TASK_NOT_DELETE });
    }
    return res.status(STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MSGS.SUCCESS_MESSAGES.TASK_DELETE,
    });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERROR_MSGS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getSignleTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
