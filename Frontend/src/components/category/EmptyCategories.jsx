import { FolderPlus } from "lucide-react";

const EmptyCategories = () => {
  return (
    <div
      className="
      mt-10
      bg-white
      border
      border-dashed
      border-gray-300
      rounded-3xl
      p-12
      flex
      flex-col
      items-center
      justify-center
      text-center
      "
    >
      <div
        className="
        w-20
        h-20
        rounded-full
        bg-gray-100
        flex
        items-center
        justify-center
        "
      >
        <FolderPlus size={36} className="text-gray-400" />
      </div>

      <h2
        className="mt-6 text-2xl"
        style={{
          fontFamily: "General Sans SemiBold",
        }}
      >
        No Categories Yet
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        Create your first category to organize tasks more efficiently.
        Categories help you group work, personal, study, health, and other
        activities.
      </p>
    </div>
  );
};

export default EmptyCategories;
