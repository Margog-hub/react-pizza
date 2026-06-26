
import { useState, useEffect, useContext } from "react"
import Categories from "../components/Categories"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Sort from "../components/Sort"
import { SearchContext } from "../App"

const Home = () => {
  const { search } = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({
    name: 'популярністю',
    sortProperty: 'rating'
  })


  useEffect(() => {
    setIsLoading(true);
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const searchs = search > 0 ? `search=${search}` : '';

    fetch(`https://68750ca8dd06792b9c967d62.mockapi.io/item?${category}&${searchs}&sortBy=${sortBy}&order=${order}`)
      .then(res => { return res.json() })
      .then(data => {
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          setItems([]);
        }
        setIsLoading(false);
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, search])


  const pizzas = items.map((obj) => (<PizzaBlock key={obj.id} {...obj} />))

  const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />)
  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickСategoryId={(i) => setCategoryId(i)} />
        <Sort sortType={sortType} setSortType={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {
          isLoading ? skeletons : pizzas
        }
      </div>
    </>
  )
}

export default Home

