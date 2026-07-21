import { Link } from "react-router-dom"
import cartNoProducts from '../assets/img/cartNoProducts.png'

const CartEmply = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Кошик пустий  <span>😕</span></h2>
        <p>
          Найімовірніше, ви не замовляли ще піцу.<br />
          Щоб замовити піцу, перейди на головну сторінку.
        </p>
        <img src={cartNoProducts} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Повернутися назад</span>
        </Link>
      </div>
    </>
  )
}

export default CartEmply