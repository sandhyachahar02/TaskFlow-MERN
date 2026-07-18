import Task from "../model/task.model.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create Task
export const createTask = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        priority,
        status,
        category,
        dueDate,
        estimatedTime,
        tags,
        notes,
        toggle,
    } = req.body;

    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Task Title is Required",
        });
    }

    const task = await Task.create({
        title,
        description,
        priority,
        status,
        category,
        dueDate,
        estimatedTime,
        tags,
        notes,
        toggle,
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        message: "Task Created Successfully",
        task,
    });
});

// Get All Tasks
export const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        count: tasks.length,
        tasks,
    });
});

// Get Single Task
export const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task Not Found",
        });
    }

    res.status(200).json({
        success: true,
        task,
    });
});

// Update Task
export const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findOneAndUpdate(
        {
            _id: req.params.id,
            user: req.user._id,
        },
        req.body,
        {
            new: true,
        }
    );

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task Not Found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Task Updated Successfully",
        task,
    });
});

// Delete Task
export const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task Not Found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Task Deleted Successfully",
    });
});

// Toggle Task Status
export const toggleTask = asyncHandler(async (req, res) => {
    const task = await Task.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task Not Found",
        });
    }

    // Toggle between Completed and Pending
    task.status =
        task.status === "Completed"
            ? "Pending"
            : "Completed";

    await task.save();

    res.status(200).json({
        success: true,
        message: "Task Status Updated Successfully",
        task,
    });
});
//Taskstats
export const getTaskStats = asyncHandler(async (req, res) => {
    const total = await Task.countDocuments({
        user: req.user._id,
    });

    const pending = await Task.countDocuments({
        user: req.user._id,
        status: "Pending",
    });

    const inProgress = await Task.countDocuments({
        user: req.user._id,
        status: "In Progress",
    });

    const completed = await Task.countDocuments({
        user: req.user._id,
        status: "Completed",
    });

    res.status(200).json({
        success: true,
        stats: {
            total,
            pending,
            inProgress,
            completed,
        },
    });
});