const loadCocktail = () => {
    const searchInput = document.getElementById('search-input')
    const searchInputText = searchInput.value
    searchInput.value = ''
    if (searchInputText === '') {
        const showMsg = document.getElementById('show-msg').innerHTML = `
            <h5 class="text-center mt-4 text-danger"> please write something</h5>
        `
    }
    else {
        const showMsg = document.getElementById('show-msg').innerHTML = `
            <h5 class="text-center d-none mt-4 text-danger">${searchInputText} Not Found!!!</h5>
            `
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInputText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayCocktail(data.drinks, searchInputText))
    }

}

const displayCocktail = (drinks, searchInputText) => {
    const cocktailContainer = document.getElementById('display-cocktail')
    cocktailContainer.textContent = ''
    if (drinks == null) {
        const showMsg = document.getElementById('show-msg').innerHTML = `
        <h5 class="text-center mt-4 text-danger">${searchInputText} Not Found!!!</h5>
        `
    }
    else {
        drinks.forEach(drink => {
            const showMsg = document.getElementById('show-msg').innerHTML = `
            <h5 class="text-center d-none mt-4 text-danger">${searchInputText} Not Found!!!</h5>
            `
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
            <div class="card h-100">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${drink.strDrink}</h5>
                    <p class="card-text">${drink.strInstructions.slice(0, 60)}</p>
                    <button onclick="getDetails(${drink.idDrink})" class="btn btn-primary">Details</button>
                </div>
            </div>
        `
            cocktailContainer.appendChild(div)
        });
    }
}

const getDetails = details => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${details}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.drinks))
}
const displayDetails = details => {
    const singleDetails = document.getElementById('single-details')
    singleDetails.textContent = ''
    details.forEach(detail => {
        const div = document.createElement('div')
        div.innerHTML = `
            
            <div class="w-75 h-50 mx-auto">
                <div class="container">
                <div class="cocktails mb-4">
                    <div class="row p-4" d-flex justify-content-between align-items-center>
                        <div class="col-lg-6">
                            <p><strong>Drink: </strong>${detail.strDrink}</p>
                            <p><strong>Category: </strong>${detail.strCategory}</p>
                            <p><strong>IBA: </strong>${detail.strIBA}</p>
                            <p><strong>Glass: </strong>${detail.strGlass}</p>
                            <p><strong>ImageSource: </strong><a href="">${detail.strImageSource}</a></p>
                            
                        </div>
                        <div class="col-lg-6">
                            <img class="w-50 d-block mx-auto rounded" src="${detail.strDrinkThumb}"  alt="...">
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        `
        singleDetails.appendChild(div)
    });
}