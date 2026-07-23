import qs from 'qs'
import { useEffect, useContext, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import Categories from "../components/Categories"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Sort from "../components/Sort"
import Pagination from "../components/Pagination";
import { SearchContext } from "../App"
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice"
import { lists } from '../assets/lists'
import { fetchPizzas } from '../redux/slices/pizzaSlice'



const Home = () => {
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sort.sortProperty)
  const currentPage = useSelector(state => state.filter.currentPage)
  const { items, status } = useSelector(state => state.pizza)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMounted = useRef(false)


  const { search } = useContext(SearchContext)


  const onClickСategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const searchs = search ? `search=${search}` : '';

    dispatch(fetchPizzas({
      order,
      sortBy,
      category,
      searchs,
      currentPage
    }));
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = lists.find(list => list.sortProperty === params.sortProperty) || lists[0];
      dispatch(setFilters({
        ...params,
        sort,
        categoryId: Number(params.categoryId) || 0,
        currentPage: Number(params.currentPage) || 1,
        search: params.search || '',
      }));
    }
  }, [dispatch]);


  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, search, currentPage]);


  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortType,
        search,
        currentPage
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, search, currentPage, navigate]);

  const pizzas = items.map((obj) => (<PizzaBlock key={obj.id} {...obj} />))
  const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />)

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickСategoryId={onClickСategory} />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>

      {
        status === 'error' ? (
          <div className='content__error-info'>
            <h2>Винекла помилка  <span>😕</span></h2>
            <p>  На жаль, не вдалося отримати піци, спробуйте пізніше</p>
          </div>
        ) : (
          <div className="content__items">
            {status === 'loading' ? skeletons : pizzas}
          </div>
        )
      }
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  )
}

export default Home