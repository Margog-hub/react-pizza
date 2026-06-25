
import { useState, useEffect } from "react"

import Categories from "../components/Categories"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Sort from "../components/Sort"

const Home = () => {
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


    fetch(`https://68750ca8dd06792b9c967d62.mockapi.io/item?${category}&sortBy=${sortBy}&order=${order}`)
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
  }, [categoryId, sortType])

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickСategoryId={(i) => setCategoryId(i)} />
        <Sort sortType={sortType} setSortType={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {
          isLoading ?
            [...new Array(12)].map((_, index) => <Skeleton key={index} />) :
            items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                {...obj} />))
        }
      </div>
    </>
  )
}

export default Home

//9