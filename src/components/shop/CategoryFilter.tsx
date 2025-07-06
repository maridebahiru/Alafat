
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  filterLabel: string;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, filterLabel }: CategoryFilterProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <span className="font-medium text-gray-700">{filterLabel}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
