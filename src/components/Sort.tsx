import { FC, memo, useEffect, useRef, useState } from "react";
import { lists, SortItem } from "../assets/lists";
import { useAppDispatch } from "../redux/store";
import { Sort } from "../redux/filter/type";
import { setSort } from "../redux/filter/slice";

type SortPopupProps = {
  sort: Sort;
};

const SortPopup: FC<SortPopupProps> = memo(({ sort }) => {
  const dispatch = useAppDispatch();

  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const onClickListItem = (list: SortItem) => {
    dispatch(setSort(list));
    setOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (sortRef.current && !sortRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label" onClick={() => setOpen(!open)}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          ></path>
        </svg>
        <b>Сортувати за:</b>
        <span>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {lists.map((list, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(list)}
                className={
                  sort.sortProperty === list.sortProperty ? "active" : ""
                }
              >
                {list.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
