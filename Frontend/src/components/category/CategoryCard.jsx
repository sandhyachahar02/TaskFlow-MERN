import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      bg-white
      border
      border-gray-200
      rounded-3xl
      shadow-sm
      p-6
      flex
      flex-col
      justify-between
      "
    >
      {/* Color + Name */}

      <div className="flex items-center gap-4">
        <div
          className="w-6 h-6 rounded-full border"
          style={{
            backgroundColor: category.color || "#6366F1",
          }}
        />

        <div>
          <h2
            className="text-xl"
            style={{
              fontFamily: "General Sans SemiBold",
            }}
          >
            {category.name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {category.color || "Default Color"}
          </p>
        </div>
      </div>

      {/* Footer */}

      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={() => onEdit(category)}
          className="
          h-11
          w-11
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
          onClick={() => onDelete(category._id)}
          className="
          h-11
          w-11
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
    </motion.div>
  );
};

export default CategoryCard;
