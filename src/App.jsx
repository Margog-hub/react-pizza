// import pizzas from './assets/pizzas.json'
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';
import { useEffect, useState } from 'react';
import Skeleton from './components/PizzaBlock/Skeleton';

function App() {
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
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
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
          </div>
        </div>
      </div>
    </>
  )
}

export default App


