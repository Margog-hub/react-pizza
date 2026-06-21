import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';
import pizzas from './assets/pizzas.json'
import { useState } from 'react';
import Skeleton from './components/PizzaBlock/Skeleton';

function App() {
  const [isLoading, setIsLoading] = useState(true)

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
              [new Array(12)].map((_, index) => <Skeleton  key={index}/>) :
              pizzas.map((obj) => ( <PizzaBlock key={obj.id} {...obj} />))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App


