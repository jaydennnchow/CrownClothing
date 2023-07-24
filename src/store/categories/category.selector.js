// the selector file is where this reducer specific transformation business logic is going to live(转换数据格式)

// 将 categoriesArray 转换成 categoriesMap
export const getCategories = state => {
    const categoryMap = {}
    state.categories.categories.forEach(category => {
        const {title,items} = category
        categoryMap[title.toLowerCase()] = items
    });
    return categoryMap
}