import axios from 'axios'
import qs from 'qs'
import { useState, useEffect, useContext, useCallback ,  useRef } from "react"
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



const Home = () => {
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sort.sortProperty)
  const currentPage = useSelector(state => state.filter.currentPage)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMounted = useRef(false)
  const isSearch = useRef(true); 

  const { search } = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const onClickСategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page))
  }

  const fetchPizzas = useCallback(() => {
    setIsLoading(true);
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const searchs = search ? `search=${search}` : '';

    axios
      .get(`https://68750ca8dd06792b9c967d62.mockapi.io/item?page=${currentPage}&limit=4&${category}&${searchs}&sortBy=${sortBy}&order=${order}`)
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setItems([]);
        setIsLoading(false);
        console.error("Помилка при фетче пиц:", err);
      });
  }, [categoryId, sortType, currentPage, search])


  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = lists.find(list => list.sortProperty === params.sortProperty) || lists[0]
      dispatch(setFilters({
        ...params,
        sort,
        categoryId: Number(params.categoryId) || 0,
        currentPage: Number(params.currentPage) || 1,
        search: params.search || '',
      }))
    }
  }, [dispatch])

  
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortType,
        search,
        currentPage
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortType, search, currentPage, navigate])

 
  useEffect(() => {
    window.scrollTo(0, 0)
    
    if (isSearch.current) {
      isSearch.current = false;
      fetchPizzas();
      return;
    }
    fetchPizzas()
  }, [categoryId, sortType, search, currentPage, fetchPizzas])

  const pizzas = items.map((obj) => (<PizzaBlock key={obj.id} {...obj} />))
  const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />)

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickСategoryId={onClickСategory} />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  )
}

export default Home