import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    toggleTask,
    getTaskStats,
} from "../controller/taskController.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);

router.get("/", authMiddleware, getTasks);

router.get("/stats", authMiddleware, getTaskStats);

router.get("/:id", authMiddleware, getTaskById);

router.put("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);

router.patch("/:id/toggle", authMiddleware, toggleTask);

router.patch("/:id/status", authMiddleware, getTaskStats);

export default router;