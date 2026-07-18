const FilterBar = ({
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
}) => {
  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-3
      gap-3
      w-full
      lg:w-auto
      "
    >
      {/* Priority */}

      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        className="
        h-12
        rounded-xl
        border
        border-gray-200
        bg-white
        px-4
        outline-none
        focus:border-black
        transition
        "
      >
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Status */}

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="
        h-12
        rounded-xl
        border
        border-gray-200
        bg-white
        px-4
        outline-none
        focus:border-black
        transition
        "
      >
        <option value="All">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Category */}

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="
        h-12
        rounded-xl
        border
        border-gray-200
        bg-white
        px-4
        outline-none
        focus:border-black
        transition
        "
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
