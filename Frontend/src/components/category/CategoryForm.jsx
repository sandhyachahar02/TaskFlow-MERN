import { useState } from "react";
import toast from "react-hot-toast";

import { createCategory, updateCategory } from "../../services/categoryService";

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
  "#06B6D4",
  "#8B5CF6",
  "#84CC16",
];

const inputStyle = `
w-full
h-12
rounded-xl
border
border-gray-200
px-4
outline-none
transition
focus:border-black
focus:ring-2
focus:ring-black/5
`;

const CategoryForm = ({ category, onClose, onSuccess }) => {
  const [name, setName] = useState(category?.name || "");
  const [color, setColor] = useState(category?.color || COLORS[0]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: name.trim(),
        color,
      };

      if (category) {
        await updateCategory(category._id, payload);
        toast.success("Category updated successfully");
      } else {
        await createCategory(payload);
        toast.success("Category created successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2
          className="text-2xl sm:text-3xl"
          style={{
            fontFamily: "General Sans SemiBold",
          }}
        >
          {category ? "Edit Category" : "New Category"}
        </h2>

        <p className="mt-2 text-gray-500">
          Organize your tasks with categories.
        </p>
      </div>

      {/* Name */}

      <div>
        <label className="block mb-2 font-medium">Category Name</label>

        <input
          type="text"
          className={inputStyle}
          placeholder="Work"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Color */}

      <div>
        <label className="block mb-3 font-medium">Category Color</label>

        <div className="flex flex-wrap gap-3">
          {COLORS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setColor(item)}
              className={`
                w-10
                h-10
                rounded-full
                border-4
                transition
                ${color === item ? "border-black scale-110" : "border-white"}
              `}
              style={{
                backgroundColor: item,
              }}
            />
          ))}
        </div>
      </div>

      {/* Buttons */}

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
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
          {loading
            ? "Saving..."
            : category
              ? "Update Category"
              : "Create Category"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
