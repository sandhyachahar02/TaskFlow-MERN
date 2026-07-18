import { Plus } from "lucide-react";

const TasksHeader = ({ title = "All Tasks", onNewTask }) => {
  const descriptions = {
    "All Tasks": "Manage everything in one place.",
    "Today's Tasks": "Focus on what needs to be completed today.",
    "Upcoming Tasks": "Plan ahead and stay on schedule.",
    "Completed Tasks": "Review everything you've accomplished.",
  };

  return (
    <div
      className="
      flex
      flex-col
      lg:flex-row
      lg:items-end
      lg:justify-between
      gap-6
      "
    >
      <div>
        <p
          className="
          uppercase
          tracking-[0.45em]
          text-xs
          text-gray-400
          "
          style={{
            fontFamily: "IBM Plex Mono",
          }}
        >
          TASKS
        </p>

        <h1
          className="
          mt-4
          text-4xl
          sm:text-5xl
          lg:text-6xl
          leading-tight
          "
          style={{
            fontFamily: "General Sans SemiBold",
          }}
        >
          {title}
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-gray-500">
          {descriptions[title] ?? "Manage everything in one place."}
        </p>
      </div>

      <button
        onClick={onNewTask}
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
  );
};

export default TasksHeader;
