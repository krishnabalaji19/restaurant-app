import './index.css'

const DishItem = props => {
  const {dishDetails, count, onIncrement, onDecrement} = props
  const {
    dishId,
    dishName,
    dishPrice,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishImage,
    dishAvailability,
    dishType,
    addonCat,
  } = dishDetails

  // In this API: dish_Type 2 = veg, 1 = non-veg
  const isVeg = dishType === 2
  const typeClassName = isVeg ? 'type-box veg-box' : 'type-box non-veg-box'
  const dotClassName = isVeg ? 'type-dot veg-dot' : 'type-dot non-veg-dot'

  return (
    <li className="dish-item">
      <div className={typeClassName}>
        <div className={dotClassName} />
      </div>

      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>

        {dishAvailability ? (
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-button"
              onClick={() => onDecrement(dishId)}
            >
              -
            </button>
            <p className="quantity">{count}</p>
            <button
              type="button"
              className="quantity-button"
              onClick={() => onIncrement(dishId)}
            >
              +
            </button>
          </div>
        ) : (
          <p className="not-available-text">Not available</p>
        )}

        {addonCat.length > 0 && (
          <p className="customizations-text">Customizations available</p>
        )}
      </div>

      <p className="dish-calories">{dishCalories} calories</p>
      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}

export default DishItem
