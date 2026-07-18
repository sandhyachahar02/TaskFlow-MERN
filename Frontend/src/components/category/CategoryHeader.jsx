import { Plus } from "lucide-react";

const CategoryHeader = ({ onNewCategory }) => {
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
          CATEGORIES
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
          Organize your work.
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-gray-500">
          Create and manage categories for your tasks.
        </p>
      </div>

      <button
        onClick={onNewCategory}
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
        New Category
      </button>
    </div>
  );
};

export default CategoryHeader;
