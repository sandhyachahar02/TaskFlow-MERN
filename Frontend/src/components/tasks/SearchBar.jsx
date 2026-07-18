import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative flex-1 w-full">
      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search tasks..."
        className="
          w-full
          h-12
          rounded-xl
          border
          border-gray-200
          bg-white
          pl-12
          pr-4
          text-sm
          outline-none
          transition
          focus:border-black
          focus:ring-2
          focus:ring-black/5
          placeholder:text-gray-400
        "
      />
    </div>
  );
};

export default SearchBar;
