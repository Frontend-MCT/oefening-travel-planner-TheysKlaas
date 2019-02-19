let countryHolder;
const localKey = 'travel-planner';

const hasItem = key => {};
const addItem = key => {}; 
const removeItem = key => {};
// const allItems = key => {};
const countItems = key => {};


const addListenersToCountries = function(classSelector){
    const countries = document.querySelectorAll(classSelector);
    for (const country of countries){
        country.addEventListener('click', function(){
            console.log('you clicked me', this);
            // functies schrijven voor local storage => opsplitsen!!
            
            
        })
    }
}

// const checkboxListener= () => {
// let visitedCountries = 0;
// const checkedCountries = document.querySelectorAll(".c-country-input")

// // listen to the clicks 
// for (const checkbox of checkedCountries) {
//     checkbox.addEventListener( 'click', function() {
//         if(this.checked) {
//             console.log("clicked checkbox", this.id, this.checked);
//             // set item in local storage
//             localStorage.setItem(this.id,this.checked)
//             visitedCountries += 1;
//             console.log("amount", visitedCountries)
//         } else {
//             // Remove item from local storage
//             localStorage.removeItem(this.id);
//             visitedCountries -= 1;
//             console.log("amount", visitedCountries)
//         }
//     });
// }
// }

const showCountries = data => {
    console.log(data);
    //3 adjust css -> screen.css
    // click on county : checked
    // flag correct height
    //1 loop data
    let countries = '';
    for (const c of data){
        //2 build an html string for each country
        countries += `
        <article>
                    <input id="${c.cioc}-${c.alpha2Code}" class="o-hide c-country-input" type="checkbox" name="">
                    <label for="${c.cioc}-${c.alpha2Code}" class="c-country js-country">
                        <div class="c-country-header">
                            <h2 class="c-country-header__name">${c.name}</h2>
                            <img class="c-country-header__flag" src="${c.flag}" alt="The flag of ${c.name}">
                        </div>
                        <p class="c-country__native-name">${c.nativeName}</p>
                    </label>
                </article>
        `;
    }

    countryHolder.innerHTML = countries;
    // Hoerah, html is loaded
    addListenersToCountries('.js-country')

    //checkboxListener();


};
const fetchCountries = region => {
        let endpoint= `https://restcountries.eu/rest/v2/region/${region}`;
        fetch(endpoint)
        .then(r => r.json())
        .then(data => showCountries(data))
        .catch(err => console.error(`an error occured 😥, ${err}`))
};

const enableListeners= () => {
    
    // 1 get some buttons
    const regionButtons = document.querySelectorAll('.js-region-select')
    // 2 listen to the clicks 
    for (const button of regionButtons) {
        button.addEventListener('click', function(){
            // 2.1 Look up the data prop
            const region = this.getAttribute('data-region');
            
            // 2.2 get data from the API
            fetchCountries(region);
        });
    }
    countryHolder = document.querySelector('.js-country-holder');

    // always start with Europe
    fetchCountries('europe');
};
const init = () => {
    console.log('init (DOM is geladen 😊)')
    enableListeners();
    checkboxListener();
};

document.addEventListener('DOMContentLoaded', init);