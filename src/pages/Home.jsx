
import { useState, useEffect } from "react"

import Categories from "../components/Categories"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Sort from "../components/Sort"

const Home = () => {
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetch('https://68750ca8dd06792b9c967d62.mockapi.io/item')
      .then(res => { return res.json() })
      .then(arr => {
        setPizzas(arr)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ?
            [new Array(12)].map((_, index) => <Skeleton key={index} />) :
            pizzas.map((obj) => (<PizzaBlock key={obj.id} {...obj} />))
        }
      </div>
    </>
  )
}

export default Home