interface mealFiltered {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}
interface mealCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
interface meals {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strTags: string;
}
interface meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strSource: string;
  ingredients: string;
}
export { meal, meals, mealCategory, mealFiltered };
