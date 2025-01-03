document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";

    const mealList = document.getElementById("meal-list");
    const groupList = document.getElementById("group-list");
    const groupCount = document.getElementById("group-count");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalCuisine = document.getElementById("modal-cuisine");
    const modalInstructions = document.getElementById("modal-instructions");
    const modalIngredients = document.getElementById("modal-ingredients");
    const closeModal = document.getElementById("close-modal");

    let selectedMeals = [];

    // Fetch data from API
    async function fetchMeals(query = "Arrabiata") {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        return data.meals || [];
    }

    // Render meal cards
    function renderMeals(meals) {
        mealList.innerHTML = "";
        if (meals.length === 0) {
            mealList.innerHTML = "<p>No meals found.</p>";
            return;
        }

        meals.forEach(meal => {
            const card = document.createElement("div");
            card.className = "meal-card";

            card.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image" />
                <h3>Name: ${meal.strMeal}</h3>
                <p>Category: ${meal.strCategory}</p>
                <p>Cuisine: ${meal.strArea}</p>
                <p>Instructions: ${meal.strInstructions.slice(0, 15)}...</p>
                <button class="add-button" data-name="${meal.strMeal}" data-image="${meal.strMealThumb}">Add to Group</button>
                <button class="details-button" data-id="${meal.idMeal}">Details</button>
            `;

            mealList.appendChild(card);
        });

        // Add event listeners to buttons
        document.querySelectorAll(".add-button").forEach(button => {
            button.addEventListener("click", () => addToGroup(button.dataset.name, button.dataset.image));
        });

        document.querySelectorAll(".details-button").forEach(button => {
            button.addEventListener("click", () => showDetails(button.dataset.id));
        });
    }



    // Show meal details in modal
    async function showDetails(id) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        const meal = data.meals[0];

        document.getElementById("modal-image").src = meal.strMealThumb;
        modalTitle.textContent = meal.strMeal;
        modalCategory.textContent = `Category: ${meal.strCategory}`;
        modalCuisine.textContent = `Cuisine: ${meal.strArea}`;
        modalInstructions.textContent = `Instructions: ${meal.strInstructions.slice(0,12)}`;
       

        modal.classList.add("visible");
    }

    // Close modal
    closeModal.addEventListener("click", () => {
        modal.classList.remove("visible");
    });

    // Search meals
    document.getElementById("search-button").addEventListener("click", async () => {
        const query = document.getElementById("search-input").value.trim();
        const meals = await fetchMeals(query);
        renderMeals(meals);
    });

    // Initial load
    fetchMeals(none).then(renderMeals);
});
