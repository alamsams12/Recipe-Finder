const searchbox = document.querySelector('.searchBox');
const searchbtn = document.querySelector('.submit-btn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-deatils-content');
const recipecloseBtn = document.querySelector('.recipe-close-btn');

const fetchRecipes=async (query)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipes..</h2>"
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}
    `);
    const response =await data.json();
    // console.log(response.meals[0]);

    recipeContainer.innerHTML="";
    response.meals.forEach(meal => { //gives all the recipes associated with that name
        const recipeDiv= document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`       
            <img src ="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span></p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        button.addEventListener('click', ()=>{
            openRecipePopup(meal);

        });

        recipeContainer.appendChild(recipeDiv);
    });
}
const fetchIngredients =(meal)=>{
    let IngredientsList = "";
    for(let i=1; i<=20; i++){
        const ingredient =meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            IngredientsList+=  `<li>${measure} ${ingredient}</li>`;
        }else{
            break;
        }
    }
    return IngredientsList;
}
const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML= `
        <h2 class ="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class = "IngredientList">${fetchIngredients(meal)}</ul>
        <div class="RecipeInstructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `
   
    recipeDetailsContent.parentElement.style.display= "block";

}

recipecloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display= "none";
});

searchbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchbox.value.trim(); //removes the spaces
    fetchRecipes(searchInput);
});