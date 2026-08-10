import qs from 'qs'
import { useCallback, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import Categories from "../components/Categories"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Sort from "../components/Sort"
import Pagination from "../components/Pagination";
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice"
import { lists } from '../assets/lists'
import { fetchPizzas, selectPizzaData, } from '../redux/slices/pizzaSlice'

const Home = () => {

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const onClickСategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = useCallback(async () => {
  const currentSort = sort?.sortProperty || 'rating';
  const order = currentSort.includes('-') ? 'asc' : 'desc';
  const sortBy = currentSort.replace('-', '');
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `search=${searchValue}` : '';

  dispatch(
    fetchPizzas({
      order,
      sortBy,
      category,
      search,
      currentPage,
    })
  );
  window.scrollTo(0, 0);
}, [categoryId, sort, searchValue, currentPage, dispatch]);

  // Парсинг параметров при первой загрузке
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortObj = lists.find(list => list.sortProperty === params.sortProperty) || lists[0];
      
      dispatch(setFilters({
        ...params,
        sort: sortObj,
        categoryId: Number(params.categoryId) || 0,
        currentPage: Number(params.currentPage) || 1,
        searchValue: params.searchValue || '',
      }));
    }
  }, [dispatch]);

  // Запрос данных при изменении фильтро Передаем getPizzas в массив зависимостей
useEffect(() => {
  getPizzas();
}, [getPizzas]);

  // Синхронизация с URL
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty: sort.sortProperty,
        searchValue: searchValue || undefined,
        currentPage
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage, navigate]);

  const pizzas = items.map((obj) => (<PizzaBlock key={obj.id} {...obj} />));
  const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickСategoryId={onClickСategory} />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>

      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Виникла помилка <span>😕</span></h2>
          <p>На жаль, не вдалося отримати піци, спробуйте пізніше</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;