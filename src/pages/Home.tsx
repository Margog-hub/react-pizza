import qs from "qs";
import { FC, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { selectFilter } from "../redux/filter/selectors";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { selectPizzaData } from "../redux/pizza/selectors";
import { useAppDispatch } from "../redux/store";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";

const Home: FC = () => {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const onClickСategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = useCallback(async () => {
    const currentSort = sort?.sortProperty || "rating";
    const order = currentSort.includes("-") ? "asc" : "desc";
    const sortBy = currentSort.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage, dispatch]);

  // // 1. Один раз при монтировании — читаем параметры из URL
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1),
  //     ) as unknown as SearchPizzaParams;
  //     const sortObj = lists.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sortObj || lists[0],
  //       }),
  //     );
  //   }
  //   isMounted.current = true;
  // }, [dispatch]);

  // 2. При изменении фильтров — обновляем URL (без dispatch!)
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     };
  //     const queryString = qs.stringify(params, { skipNulls: true });
  //     navigate(`/?${queryString}`);
  //   }
  // }, [categoryId, sort.sortProperty, currentPage, navigate]);

  // // 3. При изменении фильтров — загружаем пиццы
  useEffect(() => {
    getPizzas();
  }, [getPizzas]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(12)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickСategoryId={onClickСategory}
        />
        <Sort sort={sort} />
      </div>
      <h2 className="content__title">Всі піци</h2>

      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Виникла помилка <span>😕</span>
          </h2>
          <p>На жаль, не вдалося отримати піци, спробуйте пізніше</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
