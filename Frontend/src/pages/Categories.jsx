import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { getCategories, deleteCategory } from "../services/categoryService";

import CategoryHeader from "../components/category/CategoryHeader";
import CategoryGrid from "../components/category/CategoryGrid";
import CategoryModal from "../components/category/CategoryModal";
import Skeleton from "../components/common/Skeleton";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data.categories || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      toast.success("Category deleted successfully");

      fetchCategories();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <Skeleton className="h-12 w-64" />

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white border rounded-3xl p-6 space-y-5"
            >
              {/* Category Icon */}
              <Skeleton className="h-12 w-12 rounded-full" />

              {/* Category Name */}
              <Skeleton className="h-6 w-32" />

              {/* Description */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <Skeleton className="h-10 flex-1 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <CategoryHeader onNewCategory={handleCreate} />

      {/* Search */}

      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
        w-full
        h-12
        rounded-xl
        border
        border-gray-200
        px-4
        outline-none
        focus:border-black
        focus:ring-2
        focus:ring-black/5
        "
      />

      <CategoryGrid
        categories={filteredCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryModal
        open={showModal}
        onClose={() => setShowModal(false)}
        category={selectedCategory}
        onSuccess={fetchCategories}
      />
    </div>
  );
};

export default Categories;
