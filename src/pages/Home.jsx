import { useState, useEffect, useContext } from "react"
import Categories from "../components/Categories"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Sort from "../components/Sort"
import Pagination from "../components/Pagination";
import { SearchContext } from "../App"
import { useDispatch, useSelector } from "react-redux"
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice"
import axios from 'axios'

const Home = () => {
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sort.sortProperty)
  const currentPage = useSelector(state => state.filter.currentPage)
  const dispatch = useDispatch()

  const { search } = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const onClickСategory = (id) => {
    dispatch(setCategoryId(id))
  }
  const onChangePage =(number) => {
    dispatch(setCurrentPage(number))
  }
  useEffect(() => {
    setIsLoading(true);
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const searchs = search ? `search=${search}` : '';

    // fetch(`https://68750ca8dd06792b9c967d62.mockapi.io/item?page=${currentPage}&limit=4&${category}&${searchs}&sortBy=${sortBy}&order=${order}`)

    //   .then(res => { return res.json() })
    //   .then(data => {
    //     if (Array.isArray(data)) {
    //       setItems(data);
    //     } else {
    //       setItems([]);
    //     }
    //     setIsLoading(false);
    //   })
    // 
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
    window.scrollTo(0, 0)
  }, [categoryId, sortType, search, currentPage])



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
        {
          isLoading ? skeletons : pizzas
        }
      </div>
      <Pagination currentPage ={currentPage} onChangePage={onChangePage} />
    </>
  )
}

export default Home

