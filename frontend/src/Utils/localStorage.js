//Add a product to a localStorage
export const addFavoriteToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage()
  if(!favorites.some((p)=>p._id == product._id)) {
    favorites.push(product)
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}
//Remove product to a localStorage
export const removeFromFavorites = (productId) => {
  const favorites = getFavoritesFromLocalStorage();
  const updateFavorites = favorites.filter((product) =>product._id !== productId);
  
  localStorage.setItem("favorites", JSON.stringify(updateFavorites));
}

//Retrive favorites product to a localStorage
export const getFavoritesFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorits");
  return favoritesJSON ? JSON.parse(favoritesJSON) : []
}