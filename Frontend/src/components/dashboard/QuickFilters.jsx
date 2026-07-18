import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickFilters = ({ onNewTask }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-4 mt-14">
      {/* Add Task */}

      <button
        onClick={onNewTask}
        className="
          bg-black
          text-white
          rounded-full
          px-6
          py-3
          flex
          items-center
          gap-2
          hover:bg-neutral-800
          transition
        "
      >
        <Plus size={18} />
        Add Task
      </button>

      {/* Today */}

      <button
        onClick={() => navigate("/tasks/today")}
        className="
          rounded-full
          border
          bg-white
          px-6
          py-3
          hover:bg-gray-100
          transition
        "
      >
        Today
      </button>

      {/* Upcoming */}

      <button
        onClick={() => navigate("/tasks/upcoming")}
        className="
          rounded-full
          border
          bg-white
          px-6
          py-3
          hover:bg-gray-100
          transition
        "
      >
        Upcoming
      </button>

      {/* Completed */}

      <button
        onClick={() => navigate("/tasks/completed")}
        className="
          rounded-full
          border
          bg-white
          px-6
          py-3
          hover:bg-gray-100
          transition
        "
      >
        Completed
      </button>
    </div>
  );
};

export default QuickFilters;
