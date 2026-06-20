import { useState } from "react"

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const categories = ["Всі", "М'ясi", "Вегетаріанські", "Гриль", "Гострі", "Закриті"]

  const onClickCategory = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((categori, i) => (
            <li key={i} className={activeIndex === i ? "active" : ""} onClick={() => onClickCategory(i)}>{categori}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Categories