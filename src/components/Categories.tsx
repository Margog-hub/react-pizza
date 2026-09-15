import { FC, memo } from "react";

type CategoriesProps = {
  categoryId: number;
  onClickСategoryId: (i: number) => void;
};

const categories = [
  "Всі",
  "М'ясi",
  "Вегетаріанські",
  "Гриль",
  "Гострі",
  "Закриті",
];

const Categories: FC<CategoriesProps> = memo(
  ({ categoryId, onClickСategoryId }) => {
    
    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, i) => (
            <li
              key={i}
              className={categoryId === i ? "active" : ""}
              onClick={() => onClickСategoryId(i)}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
export default Categories;
