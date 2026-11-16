import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from './components/Header'
import CategoryTabs from './components/CategoryTabs'
import DishItem from './components/DishItem'

import './App.css'

class App extends Component {
  state = {
    isLoading: true,
    restaurantData: {},
    activeCategoryId: '',
    cartCount: 0,
    dishesCounts: {},
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(apiUrl)
    const data = await response.json()

    const formattedData = data.map(eachRest => ({
      restaurantName: eachRest.restaurant_name,
      tableMenuList: eachRest.table_menu_list.map(eachMenu => ({
        menuCategoryId: eachMenu.menu_category_id,
        menuCategory: eachMenu.menu_category,
        categoryDishes: eachMenu.category_dishes.map(eachDish => ({
          dishId: eachDish.dish_id,
          dishName: eachDish.dish_name,
          dishPrice: eachDish.dish_price,
          dishImage: eachDish.dish_image,
          dishCurrency: eachDish.dish_currency,
          dishCalories: eachDish.dish_calories,
          dishDescription: eachDish.dish_description,
          dishAvailability: eachDish.dish_Availability,
          dishType: eachDish.dish_Type,
          addonCat: eachDish.addonCat,
        })),
      })),
    }))

    this.setState({
      restaurantData: formattedData[0],
      activeCategoryId: formattedData[0].tableMenuList[0].menuCategoryId,
      isLoading: false,
    })
  }

  onIncrement = dishId => {
    this.setState(prevState => ({
      cartCount: prevState.cartCount + 1,
      dishesCounts: {
        ...prevState.dishesCounts,
        [dishId]: (prevState.dishesCounts[dishId] || 0) + 1,
      },
    }))
  }

  onDecrement = dishId => {
    this.setState(prevState => {
      const currentCount = prevState.dishesCounts[dishId] || 0
      if (currentCount > 0) {
        return {
          cartCount: prevState.cartCount - 1,
          dishesCounts: {
            ...prevState.dishesCounts,
            [dishId]: currentCount - 1,
          },
        }
      }
      return null
    })
  }

  onClickCategory = id => {
    this.setState({activeCategoryId: id})
  }

  render() {
    const {
      isLoading,
      restaurantData,
      activeCategoryId,
      cartCount,
      dishesCounts,
    } = this.state

    if (isLoading) {
      return (
        <div data-testid="loader" className="loader-container">
          <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
        </div>
      )
    }

    const {restaurantName, tableMenuList} = restaurantData
    const activeCategory = tableMenuList.find(
      each => each.menuCategoryId === activeCategoryId,
    )
    const categoryDishes = activeCategory ? activeCategory.categoryDishes : []

    return (
      <div className="app-container">
        <Header restaurantName={restaurantName} cartCount={cartCount} />

        <CategoryTabs
          tableMenuList={tableMenuList}
          activeCategoryId={activeCategoryId}
          onClickCategory={this.onClickCategory}
        />

        <ul className="dishes-list">
          {categoryDishes.map(eachDish => (
            <DishItem
              key={eachDish.dishId}
              dishDetails={eachDish}
              count={dishesCounts[eachDish.dishId] || 0}
              onIncrement={this.onIncrement}
              onDecrement={this.onDecrement}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default App
