const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const {
  taskValidation,
  statusValidation,
} = require("../middlewares/validations/validations");

router.get("/tasklist", taskController.getTasks);
router.post("/create", taskValidation, taskController.createTask);
router.get("/:id", taskController.getSignleTask);
router.put("/update/:id", taskValidation, taskController.updateTask);
router.put(
  "/update/complete/:id",
  statusValidation,
  taskController.updateTaskStatus
);
router.delete("/delete/:id", taskController.deleteTask);

module.exports = router;
