import Task from "../model/task.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getDashboardData = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const today = new Date();

  // ---------------- Stats ----------------

  const totalTasks = await Task.countDocuments({
    user: userId,
  });

  const pendingTasks = await Task.countDocuments({
    user: userId,
    status: "Pending",
  });

  const inProgressTasks = await Task.countDocuments({
    user: userId,
    status: "In Progress",
  });

  const completedTasks = await Task.countDocuments({
    user: userId,
    status: "Completed",
  });

  const overdueTasks = await Task.countDocuments({
    user: userId,
    status: { $ne: "Completed" },
    dueDate: { $lt: today },
  });

  // ---------------- Recent Tasks ----------------

  const recentTasks = await Task.find({
    user: userId,
  })
    .sort({ createdAt: -1 })
    .limit(5);

  // ---------------- Upcoming Tasks ----------------

  const upcomingTasks = await Task.find({
    user: userId,
    dueDate: { $gte: today },
  })
    .sort({ dueDate: 1 })
    .limit(5);

  // ---------------- Category Distribution ----------------

  const categoryAggregation = await Task.aggregate([
    {
      $match: {
        user: userId,
      },
    },
    {
      $group: {
        _id: {
          $ifNull: ["$category", "General"],
        },
        value: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        value: 1,
      },
    },
  ]);

  // ---------------- Weekly Productivity ----------------

  const weekNames = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const weeklyData = weekNames.map((day) => ({
    day,
    tasks: 0,
  }));

  const lastSevenDays = new Date();
  lastSevenDays.setDate(today.getDate() - 6);

  const weeklyTasks = await Task.find({
    user: userId,
    createdAt: {
      $gte: lastSevenDays,
    },
  });

  weeklyTasks.forEach((task) => {
    const dayIndex = new Date(task.createdAt).getDay();
    weeklyData[dayIndex].tasks += 1;
  });

  res.status(200).json({
    success: true,

    stats: {
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      overdueTasks,
    },

    recentTasks,

    upcomingTasks,

    weeklyData,

    categoryData: categoryAggregation,
  });
});