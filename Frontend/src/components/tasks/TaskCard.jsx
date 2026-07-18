import { Calendar, Folder, Pencil, Trash2, CheckCircle2 } from "lucide-react";

const priorityColors = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-amber-100 text-amber-600",
  Low: "bg-green-100 text-green-600",
};

const statusColors = {
  Pending: "bg-orange-100 text-orange-600",
  "In Progress": "bg-blue-100 text-blue-600",
  Completed: "bg-green-100 text-green-600",
};

const TaskCard = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <div
      className="
      bg-white
      border
      border-gray-200
      rounded-3xl
      shadow-sm
      p-5
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold break-words">{task.title}</h2>

          <p className="text-gray-500 mt-2 text-sm leading-6 break-words">
            {task.description || "No description"}
          </p>
        </div>

        <div className="flex flex-row sm:flex-col gap-2">
          <span
            className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            text-center
            whitespace-nowrap
            ${priorityColors[task.priority] || "bg-gray-100 text-gray-700"}
            `}
          >
            {task.priority}
          </span>

          <span
            className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            text-center
            whitespace-nowrap
            ${statusColors[task.status] || "bg-gray-100 text-gray-700"}
            `}
          >
            {task.status}
          </span>
        </div>
      </div>

      {/* Info */}

      <div
        className="
        mt-6
        grid
        grid-cols-1
        sm:grid-cols-2
        gap-3
        text-sm
        text-gray-500
        "
      >
        <div className="flex items-center gap-2">
          <Calendar size={16} />

          <span>
            {task.dueDate
              ? new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(task.dueDate))
              : "No Due Date"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Folder size={16} />

          <span className="capitalize">{task.category || "General"}</span>
        </div>
      </div>

      {/* Buttons */}

      <div
        className="
        mt-8
        flex
        flex-col
        sm:flex-row
        gap-3
        "
      >
        <button
          onClick={() => onToggle(task._id)}
          className="
          flex-1
          h-11
          rounded-xl
          bg-green-500
          hover:bg-green-600
          text-white
          transition
          "
        >
          <CheckCircle2 size={18} className="inline mr-2" />
          Complete
        </button>

        <button
          onClick={() => onEdit(task)}
          className="
          h-11
          w-full
          sm:w-11
          border
          rounded-xl
          hover:bg-gray-100
          transition
          flex
          justify-center
          items-center
          "
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="
          h-11
          w-full
          sm:w-11
          border
          rounded-xl
          hover:bg-red-100
          transition
          flex
          justify-center
          items-center
          "
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
