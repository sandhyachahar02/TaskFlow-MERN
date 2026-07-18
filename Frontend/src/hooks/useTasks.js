import { useEffect, useState } from "react";

import {
  getTasks,
  deleteTask,
  toggleTask,
} from "../services/taskService";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data.tasks || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

const handleDelete = async (id) => {
  try {
    await deleteTask(id);
    await fetchTasks();
  } catch (error) {
    console.error(error);
  }
};

  const handleToggle = async (id) => {
    try {
      await toggleTask(id);
      await fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    tasks,
    loading,

    fetchTasks,

    showModal,
    setShowModal,

    selectedTask,
    setSelectedTask,

    handleCreate,
    handleEdit,
    handleDelete,
    handleToggle,
  };
};

export default useTasks;