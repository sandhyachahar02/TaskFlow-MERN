import TaskCard from "./TaskCard";

const TaskGrid = ({ tasks, onEdit, onDelete, onToggle }) => {
  if (!tasks.length) return null;

  return (
    <div
      className="
        mt-8
        grid
        grid-cols-1
        md:grid-cols-2
        2xl:grid-cols-3
        gap-6
      "
    >
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TaskGrid;
