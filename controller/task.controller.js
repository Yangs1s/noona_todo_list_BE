const Task = require("../model/Task");
const taskController = {};

// Task 추가
taskController.createTask = async (req, res) => {
  try {
    const { task, isCompleted } = req.body;
    const { userId } = req;
    const newTask = new Task({ task, isCompleted, author: userId });
    await newTask.save();

    res.status(200).json({
      message: "태스크 추가 성공",
      tasks: newTask,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Task 조회 - 현재 로그인한 유저의 Task만
taskController.getTasks = async (req, res) => {
  try {
    const { userId } = req;
    const tasks = await Task.find({ author: userId }).populate("author");
    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks: tasks,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// Task 수정

taskController.updateTask = async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  try {
    if (typeof isCompleted !== "boolean") {
      return res.status(400).json({
        message: "isCompleted는 boolean 타입이어야 합니다.",
      });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    )
      .select("-__v")
      .populate("author"); // author 정보 포함

    res.status(200).json({
      message: "업데이트 성공",
      tasks: updatedTask,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// Task 삭제

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({
      message: "삭제 성공",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = taskController;
