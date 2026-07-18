import CategoryCard from "./CategoryCard";
import EmptyCategories from "./EmptyCategories";

const CategoryGrid = ({ categories, onEdit, onDelete }) => {
  if (!categories.length) {
    return <EmptyCategories />;
  }

  return (
    <div
      className="
      mt-8
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-3
      2xl:grid-cols-4
      gap-6
      "
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;
