import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



const FullPazza = () => {
  const [pizza, setPizza] = useState(null)
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://68750ca8dd06792b9c967d62.mockapi.io/item/${id}`)
        setPizza(data)
      } catch (err) {
        alert("Помилка при отриманні піци", err)
        navigate('/')
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return <div className="loading">Загрузка піци....</div>;
  }
  return (
    <div className="pizza-card">
      <img
        src={pizza.imageUrl}
        alt={pizza.title}
        className="pizza-image"
      />
      <h2 className="pizza-title">{pizza.title}</h2>
      <h4 className="pizza-price">{pizza.price} грн.</h4>
    </div>
  )
}

export default FullPazza