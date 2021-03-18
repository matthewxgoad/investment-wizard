
// This stuff is from the tickerreader js
// Comment out before testing
// Remove before deploy
// const searchButton = document.getElementById('search-btn')
// searchButton.addEventListener('click', buttonSubmit)

// function buttonSubmit() {
//     let searchInput = document.getElementById('search-input')
//     let userInput = searchInput.value
//     userInput = userInput.toUpperCase().trim()
//     localStorage.setItem('ticker', userInput)
//     fetchStockPrice(userInput)
// }
// GLOBAL VARIABLES //
let buttonListEl = document.getElementById('buttonListEl');


// FUNCTIONS //

// Stores user input to localStorage
function storeSymbolLocal(symbol) {
    console.log(symbol);
    localStorage.setItem(symbol, symbol);
}

// Retreive STOCK SYMBOLS from localStorage and insert into document
function getStoredSymbols() {
    for( i = 0; i < localStorage.length; i++ ) {
        let stockSymbolStored = localStorage.key(i);
        console.log(stockSymbolStored);
        let stockSymbolBtn = document.createElement('button');
        stockSymbolBtn.setAttribute('class', 'button is-large is-fullwidth');
        stockSymbolBtn.textContent = stockSymbolStored;
        buttonListEl.prepend(stockSymbolBtn);
        stockSymbolBtn.addEventListener("click", function(){
            processStockBtnClick(stockSymbolBtn.innerHTML)}
        )
    }
}
function processStockBtnClick( symbol ) {
    userInput = symbol;
    fetchStockPrice(symbol);
}
// Clear local storage events
function clearLocalStorage() {
    localStorage.clear();
    removeButtons();
    location.reload();
}
function removeButtons() {
    while (buttonListEl.firstChild) {
        buttonListEl.removeChild(buttonListEl.firstChild);
    }
}
var myStockInfo = ["AMC", "IBM", "GME"];

$("#search-input").autocomplete(
    {
    source: myStockInfo
    },
    {
    autofocus: true,
    delay: 300,
    minLength: 2,
    });

// EVENT LISTENERS //
document.onload = getStoredSymbols();
document.getElementById('clearHistoryBtn').addEventListener("click", clearLocalStorage);

