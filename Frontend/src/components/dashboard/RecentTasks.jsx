import {
  Calendar,
  FolderKanban,
  Pencil,
  Trash2,
  CheckCircle2,
} from "lucide-react";

const priorityColor = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-amber-100 text-amber-600",
  Low: "bg-green-100 text-green-600",
};

const statusColor = {
  Pending: "bg-orange-100 text-orange-600",
  "In Progress": "bg-blue-100 text-blue-600",
  Completed: "bg-green-100 text-green-600",
};

const RecentTasks = ({ tasks = [], onEdit, onDelete, onToggle }) => {
  return (
    <section className="mt-10 xl:col-span-3">
      <div className="mb-6">
        <p
          className="
          uppercase
          tracking-[0.25em]
          text-[10px]
          sm:text-xs
          text-gray-400
          "
          style={{ fontFamily: "IBM Plex Mono" }}
        >
          Overview
        </p>

        <h2
          className="mt-2 text-2xl sm:text-3xl"
          style={{
            fontFamily: "General Sans SemiBold",
          }}
        >
          Recent Tasks
        </h2>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center text-gray-500">
          No recent tasks available.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="
              bg-white
              border
              border-gray-200
              rounded-3xl
              shadow-sm
              p-5
              hover:shadow-lg
              transition-all
              duration-300
              "
            >
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold break-words">
                    {task.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500 leading-6 break-words">
                    {task.description || "No description"}
                  </p>
                </div>

                <div className="flex flex-row sm:flex-col gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      priorityColor[task.priority] ??
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.priority}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColor[task.status] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-500">
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
                  <FolderKanban size={16} />

                  <span className="capitalize">
                    {task.category || "General"}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onToggle(task._id)}
                  className={`
    flex-1
    h-11
    rounded-xl
    text-white
    transition
    ${
      task.status === "Completed"
        ? "bg-blue-500 hover:bg-blue-600"
        : "bg-green-500 hover:bg-green-600"
    }
  `}
                >
                  <CheckCircle2 size={18} className="inline mr-2" />
                  {task.status === "Completed" ? "Reopen" : "Complete"}
                </button>
                <button
                  onClick={() => onEdit(task)}
                  className="
                  h-11
                  w-full
                  sm:w-11
                  rounded-xl
                  border
                  hover:bg-gray-100
                  transition
                  flex
                  items-center
                  justify-center
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
                  rounded-xl
                  border
                  hover:bg-red-100
                  transition
                  flex
                  items-center
                  justify-center
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentTasks;
