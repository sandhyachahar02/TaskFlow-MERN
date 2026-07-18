import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { createTask, updateTask } from "../../services/taskService";
import { getCategories } from "../../services/categoryService";

const inputStyle = `
w-full
h-12
rounded-xl
border
border-gray-200
bg-white
px-4
outline-none
transition
focus:border-black
focus:ring-2
focus:ring-black/5
`;

const labelStyle = `
block
mb-2
text-sm
font-medium
text-gray-700
`;

const TaskForm = ({ task, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "Medium",
    status: task?.status || "Pending",
    category: task?.category || "",
    dueDate: task?.dueDate ? task.dueDate.slice(0, 10) : "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      ...form,
      dueDate: form.dueDate ? new Date(form.dueDate + "T12:00:00") : null,
    };

    try {
      if (task) {
        await updateTask(task._id, payload);
        toast.success("Task Updated Successfully");
      } else {
        await createTask(payload);
        toast.success("Task Created Successfully");
      }

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold">
          {task ? "Update Task" : "Create Task"}
        </h2>

        <p className="text-gray-500 mt-2">Fill in the details below.</p>
      </div>

      {/* Title */}

      <div>
        <label className={labelStyle}>Title</label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className={inputStyle}
          required
        />
      </div>

      {/* Description */}

      <div>
        <label className={labelStyle}>Description</label>

        <textarea
          rows={4}
          name="description"
          value={form.description}
          onChange={handleChange}
          className="
          w-full
          rounded-xl
          border
          border-gray-200
          p-4
          outline-none
          transition
          focus:border-black
          focus:ring-2
          focus:ring-black/5
          resize-none
          "
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelStyle}>Priority</label>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className={inputStyle}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div>
          <label className={labelStyle}>Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputStyle}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Updated Category */}

        <div>
          <label className={labelStyle}>Category</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelStyle}>Due Date</label>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className={inputStyle}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="
          h-11
          px-6
          rounded-xl
          border
          hover:bg-gray-100
          transition
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
          h-11
          px-6
          rounded-xl
          bg-black
          text-white
          hover:bg-neutral-800
          transition
          disabled:opacity-60
          "
        >
          {loading ? "Saving..." : task ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
