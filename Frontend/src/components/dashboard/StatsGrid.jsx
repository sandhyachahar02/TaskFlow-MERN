import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ListTodo,
  LoaderCircle,
} from "lucide-react";

import StatCard from "./StatCard";

const StatsGrid = ({ stats }) => {
  const cards = [
    {
      title: "Total",
      value: stats?.totalTasks ?? 0,
      icon: <ListTodo size={22} />,
      color: "bg-indigo-600",
    },
    {
      title: "Pending",
      value: stats?.pendingTasks ?? 0,
      icon: <Clock3 size={22} />,
      color: "bg-amber-500",
    },
    {
      title: "In Progress",
      value: stats?.inProgressTasks ?? 0,
      icon: <LoaderCircle size={22} />,
      color: "bg-blue-600",
    },
    {
      title: "Completed",
      value: stats?.completedTasks ?? 0,
      icon: <CheckCircle2 size={22} />,
      color: "bg-green-600",
    },
    {
      title: "Overdue",
      value: stats?.overdueTasks ?? 0,
      icon: <AlertTriangle size={22} />,
      color: "bg-red-500",
    },
  ];

  return (
    <section
      className="
      mt-10
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-5
      gap-5
      "
    >
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </section>
  );
};

export default StatsGrid;
