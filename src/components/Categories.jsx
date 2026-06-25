const Categories = ({ categoryId, onClickСategoryId }) => {

  const categories = ["Всі", "М'ясi", "Вегетаріанські", "Гриль", "Гострі", "Закриті"]


  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, i) => (
            <li
              key={i}
              className={categoryId === i ? "active" : ""}
              onClick={() => onClickСategoryId(i)}>
              {categoryName}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Categories