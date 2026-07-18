import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { deleteTask, toggleTask } from "../services/taskService";
import { getDashboardData } from "../services/dashboardService";

import OverviewSection from "../components/dashboard/OverviewSection";
import QuickFilters from "../components/dashboard/QuickFilters";
import StatsGrid from "../components/dashboard/StatsGrid";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import RecentTasks from "../components/dashboard/RecentTasks";
import ConfirmModal from "../components/common/ConfirmModal";
import TaskModal from "../components/tasks/TaskModal";
import Skeleton from "../components/common/Skeleton";
const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDashboardData();

      setDashboard(response);
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

  const handleDelete = (id) => {
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

      await deleteTask(taskToDelete);

      await fetchDashboard();

      closeDeleteModal();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleTask(id);
      fetchDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <Skeleton className="h-16 w-80" />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-36 rounded-3xl" />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Skeleton className="h-80 rounded-3xl xl:col-span-2" />
          <Skeleton className="h-80 rounded-3xl" />
        </div>

        {/* Recent Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} className="h-64 rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Hero */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <OverviewSection />

        <button
          onClick={handleCreate}
          className="
          self-start
          lg:self-auto
          h-12
          px-6
          rounded-full
          bg-black
          text-white
          flex
          items-center
          gap-2
          hover:bg-neutral-800
          transition
          "
        >
          <Plus size={18} />
          New Task
        </button>
      </div>

      <QuickFilters onNewTask={handleCreate} />

      <StatsGrid stats={dashboard?.stats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <WeeklyChart data={dashboard?.weeklyData ?? []} />
        </div>

        <CategoryChart data={dashboard?.categoryData ?? []} />
      </div>

      <RecentTasks
        tasks={dashboard?.recentTasks ?? []}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />

      <TaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        task={selectedTask}
        onSuccess={fetchDashboard}
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

export default Dashboard;
