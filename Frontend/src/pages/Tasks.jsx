import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import useTasks from "../hooks/useTasks";
import ConfirmModal from "../components/common/ConfirmModal";
import TasksHeader from "../components/tasks/TasksHeader";
import SearchBar from "../components/tasks/SearchBar";
import FilterBar from "../components/tasks/FilterBar";
import EmptyTasks from "../components/tasks/EmptyTasks";
import TaskGrid from "../components/tasks/TaskGrid";
import TaskModal from "../components/tasks/TaskModal";
import Skeleton from "../components/common/Skeleton";
const Tasks = () => {
  const location = useLocation();

  const {
    tasks,
    loading,
    fetchTasks,

    showModal,
    setShowModal,

    selectedTask,

    handleCreate,
    handleEdit,
    handleDelete,
    handleToggle,
  } = useTasks();

  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(tasks.map((task) => task.category).filter(Boolean)),
    ];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return tasks.filter((task) => {
      const taskDate = task.dueDate ? new Date(task.dueDate) : null;

      if (taskDate) {
        taskDate.setHours(0, 0, 0, 0);
      }

      // -------- Route Filter --------

      let matchesRoute = true;

      switch (location.pathname) {
        case "/tasks/today":
          matchesRoute = taskDate && taskDate.getTime() === today.getTime();
          break;

        case "/tasks/upcoming":
          matchesRoute = taskDate && taskDate.getTime() > today.getTime();
          break;

        case "/tasks/completed":
          matchesRoute = task.status === "Completed";
          break;

        default:
          matchesRoute = true;
      }

      // -------- Search --------

      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description || "").toLowerCase().includes(search.toLowerCase()) ||
        (task.category || "").toLowerCase().includes(search.toLowerCase());

      // -------- Filters --------

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || task.category === categoryFilter;

      return (
        matchesRoute &&
        matchesSearch &&
        matchesPriority &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    tasks,
    search,
    priorityFilter,
    statusFilter,
    categoryFilter,
    location.pathname,
  ]);

  const pageTitle = useMemo(() => {
    switch (location.pathname) {
      case "/tasks/today":
        return "Today's Tasks";

      case "/tasks/upcoming":
        return "Upcoming Tasks";

      case "/tasks/completed":
        return "Completed Tasks";

      default:
        return "All Tasks";
    }
  }, [location.pathname]);

  const openDeleteModal = (id) => {
    setTaskToDelete(id);
    setConfirmOpen(true);
  };

  const closeDeleteModal = () => {
    setConfirmOpen(false);
    setTaskToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await handleDelete(taskToDelete);

      closeDeleteModal();
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <TasksHeader title={pageTitle} onNewTask={handleCreate} />

      <div className="flex flex-col lg:flex-row gap-4">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

        <FilterBar
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white border rounded-3xl p-6 space-y-5"
            >
              {/* Title */}
              <Skeleton className="h-6 w-2/3" />

              {/* Description */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />

              {/* Badges */}
              <div className="flex gap-3">
                <Skeleton className="h-7 w-20 rounded-full" />
                <Skeleton className="h-7 w-24 rounded-full" />
              </div>

              {/* Date */}
              <Skeleton className="h-4 w-40" />

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <Skeleton className="h-10 flex-1 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        <EmptyTasks />
      ) : (
        <TaskGrid
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
          onToggle={handleToggle}
        />
      )}

      <TaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        task={selectedTask}
        onSuccess={fetchTasks}
      />
      <ConfirmModal
        open={confirmOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
};

export default Tasks;
