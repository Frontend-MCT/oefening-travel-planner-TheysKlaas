let countryHolder,
    amountHolder;
const localKey = 'travel-planner';



const addItem = key => {
    let countries = getAllItems(); // array ophalen
    countries.push(key);
    localStorage.setItem(localKey, JSON.stringify(countries));
}; 
const removeItem = key => {
    const index = getAllItems().indexOf(key); // waar staat het land dat weg mag?
    let savedCountries = getAllItems();
    savedCountries.splice(index,1); // verwijder dat item in de array
    localStorage.setItem(localKey, JSON.stringify(savedCountries));
};
const getAllItems = () => {
    // if (localStorage.hasItem(localKey)){
    //     return localStorage.getItem(localKey);  
    // }
    // else{
    //     return []
    // }
    return JSON.parse(localStorage.getItem(localKey)) || [];
};
const countItems = () => {
    return getAllItems().length;
};
const hasItem = key => {
    //return ~getAllItems().indexOf(key); // -1 if not founc , anders de positie.
    return getAllItems().includes(key)
};

const updateCounter = () => {
   amountHolder.innerHTML = countItems();
};

const addListenersToCountries = function(classSelector){
    const countries = document.querySelectorAll(classSelector);
    for (const country of countries){
        country.addEventListener('click', function(){
            console.log('you clicked me', this);
            // functies schrijven voor local storage => opsplitsen!!
            const countryKey = this.getAttribute('for');
            if (hasItem(countryKey)){
                removeItem(countryKey);
            }
            else{
                addItem(countryKey);
            }
            updateCounter();            
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
                    <input id="${c.cioc}-${c.alpha2Code}" class="o-hide c-country-input" type="checkbox" name="" ${(hasItem(c.cioc + '-' + c.alpha2Code)) ? 'checked="checked"' : ''}>
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
    amountHolder =  document.querySelector('.js-amount');

    // always start with Europe
    fetchCountries('europe');
    updateCounter();
};
const init = () => {
    console.log('init (DOM is geladen 😊)')
    enableListeners();
    //checkboxListener();
};

document.addEventListener('DOMContentLoaded', init);