import './index.css'

const CategoryTabs = props => {
  const {tableMenuList, activeCategoryId, onClickCategory} = props

  return (
    <ul className="tabs-list">
      {tableMenuList.map(eachCategory => {
        const isActive = eachCategory.menuCategoryId === activeCategoryId
        const tabClassName = isActive ? 'tab-item active-tab' : 'tab-item'

        return (
          <li key={eachCategory.menuCategoryId} className={tabClassName}>
            <button
              type="button"
              className="tab-button"
              onClick={() => onClickCategory(eachCategory.menuCategoryId)}
            >
              {eachCategory.menuCategory}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default CategoryTabs
