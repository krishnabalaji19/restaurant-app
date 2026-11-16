import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'

const Header = props => {
  const {restaurantName, cartCount} = props

  return (
    <nav className="navbar">
      <h1 className="restaurant-name">{restaurantName}</h1>
      <div className="cart-container">
        <p className="my-orders-text">My Orders</p>
        <div className="cart-icon-container">
          <AiOutlineShoppingCart className="cart-icon" />
          <span className="cart-count" data-testid="cart-count">
            {cartCount}
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Header
