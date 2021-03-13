
// GLOBAL VARIABLES //

let sidebarEl = document.getElementById('sidebarEL');


// FUNCTIONS //

// localStorage.setItem('1', 'B');
// localStorage.setItem('2', 'B');
// localStorage.setItem('3', 'B');
// localStorage.setItem('4', 'B');
// localStorage.setItem('5', 'B');

// Retreive STOCK SYMBOLS from localStorage and insert into document
function createSideStockBtns() {
    for( i = 0; i < 5; i++ ) {
        let stockSymbolStored = localStorage.getItem(i);
        console.log(stockSymbolStored);
        let stockSymbolBtn = document.createElement('div');
        console.log(stockSymbolBtn);
        stockSymbolBtn.setAttribute('class', 'btn');
        stockSymbolBtn.textContent = stockSymbolStored;
        sidebarEl.appendChild(stockSymbolBtn)
    }
}
// Clear local storage events
function clearLocalStorage() {
    localStorage.clear();
    location.reload();
}


// EVENT LISTENERS //


