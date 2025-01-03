document.addEventListener("DOMContentLoaded", () => {
    // const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

    const drinkList = document.getElementById("drink-list");
    const groupList = document.getElementById("group-list");
    const groupCount = document.getElementById("group-count");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalAlcoholic = document.getElementById("modal-alcoholic");
    const modalGlass = document.getElementById("modal-glass");
    const modalInstructions = document.getElementById("modal-instructions");
    const modalIngredients = document.getElementById("modal-ingredients");
    const closeModal = document.getElementById("close-modal");

    let selectedDrinks = [];

    // Fetch data from API
    async function fetchDrinks(query = "margarita") {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        return data.drinks || [];
    }

    // Render drink cards
    function renderDrinks(drinks) {
        drinkList.innerHTML = "";
        if (drinks.length === 0) {
            drinkList.innerHTML = "<p>No drinks found.</p>";
            return;
        }

        drinks.forEach(drink => {
            const card = document.createElement("div");
            card.className = "drink-card";

            card.innerHTML = `
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="drink-image" />
                <h3>Name: ${drink.strDrink}</h3>
                <p>Category: ${drink.strCategory}</p>
                <p>Instructions: ${drink.strInstructions.slice(0, 15)}...</p>
                <button class="add-button" data-name="${drink.strDrink}" data-image="${drink.strDrinkThumb}">Add to Group</button>
                <button class="details-button" data-id="${drink.idDrink}">Details</button>
            `;

            drinkList.appendChild(card);
        });

        // Add event listeners to buttons
        document.querySelectorAll(".add-button").forEach(button => {
            button.addEventListener("click", () => addToGroup(button.dataset.name, button.dataset.image));
        });

        document.querySelectorAll(".details-button").forEach(button => {
            button.addEventListener("click", () => showDetails(button.dataset.id));
        });
    }

    // Add drink to group
    function addToGroup(name, image) {
        if (selectedDrinks.length >= 7) {
            alert("You cannot add more than 7 drinks to the group.");
            return;
        }

        if (!selectedDrinks.some(drink => drink.name === name)) {
            selectedDrinks.push({ name, image });
            updateGroupList();
        }
    }

    // Update group list
    function updateGroupList() {
        groupList.innerHTML = "";
        selectedDrinks.forEach((drink, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td class="imgg"><img src="${drink.image}" alt="${drink.name}" class="group-image" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" /></td>
                <td>${drink.name.slice(0,8)}</td>
            `;

            groupList.appendChild(row);
        });
        groupCount.textContent = `Total: ${selectedDrinks.length}`;
    }

    // Show drink details in modal
    async function showDetails(id) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        const drink = data.drinks[0];

        document.getElementById("modal-image").src = drink.strDrinkThumb;
        modalTitle.textContent = drink.strDrink;
        modalCategory.textContent = `Category: ${drink.strCategory}`;
        modalAlcoholic.textContent = `Alcoholic: ${drink.strAlcoholic}`;
        modalGlass.textContent = `Glass: ${drink.strGlass}`;
        modalInstructions.textContent = `Instructions: ${drink.strInstructions.slice(0,10)}`;
        modalIngredients.textContent = `Ingredients: ${
            Object.keys(drink)
                .filter(key => key.startsWith("strIngredient") && drink[key])
                .map(key => drink[key])
                .join(", ")
        }`;

        
        modal.classList.add("visible");
    }

    // Close modal
    closeModal.addEventListener("click", () => {
        modal.classList.remove("visible");
    });

    // Search drinks
    document.getElementById("search-button").addEventListener("click", async () => {
        const query = document.getElementById("search-input").value.trim();
        const drinks = await fetchDrinks(query);
        renderDrinks(drinks);
    });

    // Initial load
    fetchDrinks("drink").then(renderDrinks);
});
