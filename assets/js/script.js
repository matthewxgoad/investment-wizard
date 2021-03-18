
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

$("#search-inpuxt").autocomplete(
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

$( function() {
    var projects = [
      {
        value: "BA",
        label: "Boeing Company",
      },
      {
        value: "BAA",
        label: "Banro Corporation USA",
      },
      {
        value: "BAB",
        label: "Invesco Taxable Municipal Bond ETF",
      }
    ];
 
    $( "#search-input" ).autocomplete({
      minLength: 0,
      source: projects,
      focus: function( event, ui ) {
        $( "#search-input" ).val( ui.item.label );
        return false;
      },
      select: function( event, ui ) {
        $( "#search-input" ).val( ui.item.label );
        $( "#search-input-id" ).val( ui.item.value );
        // $( "#project-description" ).html( ui.item.desc );
        // $( "#project-icon" ).attr( "src", "images/" + ui.item.icon );
 
        return true;
      }
    })
    .autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<div>" + item.value + "<br>" + item.label + "</div>" )
        .appendTo( ul );
    };
  } );