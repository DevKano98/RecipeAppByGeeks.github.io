const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

// Function to fetch Starter recipes automatically when the page loads
const fetchStarterRecipes = async () => {
  recipeContainer.innerHTML = "<h2>Fetching Starter Recipes...</h2>";
  try {
    const data = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter"
    );
    const response = await data.json();

    recipeContainer.innerHTML = ""; // Clear any previous content
    response.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
            `;
      const button = document.createElement("button");
      button.textContent = "View recipe";
      recipeDiv.appendChild(button);

      // Adding event listener to the recipe button
      button.addEventListener("click", async () => {
        const mealData = await fetchMealDetails(meal.idMeal);
        openRecipePopup(mealData);
      });

      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML =
      "<h2>Sorry, but no Starter recipes were found...</h2>";
  }
};

// Function to fetch detailed meal data by meal ID
const fetchMealDetails = async (id) => {
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const response = await data.json();
  return response.meals[0];
};

// To fetch ingredients and measurements
const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

// Function to open the recipe popup
const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;
  recipeDetailsContent.parentElement.style.display = "block";
};

// Close the popup when the close button is clicked
recipeCloseBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});

// Fetch Starter recipes when the page loads
window.onload = fetchStarterRecipes;
