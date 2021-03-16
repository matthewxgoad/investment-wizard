
let callURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=S5E23FUR0IXVEJ9R'

const searchButton = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')

searchInput.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') 
    buttonSubmit(); 
});
searchButton.addEventListener('click', buttonSubmit)

//

function buttonSubmit() {
    let searchInput = document.getElementById('search-input')
    let userInput = searchInput.value

    userInput = userInput.toUpperCase().trim()

    // else if (userInput != listofAllTickers)

    localStorage.setItem('ticker', userInput)

    fetchStockPrice(userInput)

}

//the first call is to get the stock price changes
//the second call is to get the name of the company only

function fetchStockPrice(tickerName) {

    // callURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + tickerName + '&interval=5min&outputsize=compact&apikey=S5E23FUR0IXVEJ9R'

    callURL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + tickerName + '&apikey=S5E23FUR0IXVEJ9R'


    fetch(callURL)
        //this is the original fetch
        .then(response => response.json())
        //this fetch gets the price action
        .then(data => {
       
            let stockInfo = data['Global Quote']
            console.log(stockInfo)
            //calling the below function with an additional fetch to a different API to get company name
            getCompanyName(stockInfo)
            //then passes the "tickerName" to the populateBoxes function
        })

        .catch(error => {
            console.log('Error:', error);
        });

}


    //this function contains a second fetch within a function which is nested underneath the primary fetch

    function getCompanyName(stockInfo) {
        let ticker = stockInfo['01. symbol']
        fetch('https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + ticker + '&apikey=S5E23FUR0IXVEJ9R')
            .then(response => response.json())
            .then(tickerNameData => {
                console.log(tickerNameData)
                // let tickerNameData = data
                
                populateBoxes(stockInfo, tickerNameData)
            }
            )
            .catch(error => {
                console.log('Error:', error);
            });
    }

function populateBoxes(stockInfo, tickerNameData) {

    const stockInfoItems = document.getElementById('stock-info-items')
    const tickerDiv = document.createElement("div")
    const percentChangeDiv = document.createElement("div")
    const valueChangeDiv = document.createElement("div")

    const tickerNameP = document.createElement("p")
    const companyNameP = document.createElement("p")
    const dollarP = document.createElement("p")
    const amountChangeP = document.createElement("p")
    const percentP = document.createElement("p")
    const percentChangeP = document.createElement("p")

    tickerNameP.classList.add("title");
    companyNameP.classList.add("subtitle");
    dollarP.classList.add("title");
    amountChangeP.classList.add("subtitle");
    percentP.classList.add("title");
    percentChangeP.classList.add("subtitle");

    tickerNameP.classList.add("title");
    companyNameP.classList.add("subtitle");
    dollarP.classList.add("title");
    amountChangeP.classList.add("subtitle");
    percentP.classList.add("title");
    percentChangeP.classList.add("subtitle");

    tickerNameP.classList.add("greenText");
    percentP.classList.add("greenText");
    dollarP.classList.add("greenText");

    let ticker = stockInfo["01. symbol"]
    let dollarChange = stockInfo["09. change"]
    let percentChange = stockInfo["10. change percent"]
    let companyName = tickerNameData["Name"]

    tickerNameP.innerHTML = (ticker);
    companyNameP.innerHTML = (companyName);
    dollarP.innerHTML = ('&dollar;' + dollarChange)
    amountChangeP.innerHTML = ("Dollar Change")
    percentP.innerHTML = (percentChange)
    percentChangeP.innerHTML = ("Percent Change");

    tickerDiv.classList.add("tile", "is-child", "box","has-text-centered");
    percentChangeDiv.classList.add("tile", "is-child", "box", "has-text-centered");
    valueChangeDiv.classList.add("tile", "is-child", "box", "has-text-centered");

    if (dollarChange.charAt(0) == "-") {
        tickerNameP.classList.remove('greenText')
        tickerNameP.classList.add('redText')
        dollarP.classList.remove('greenText')
        dollarP.classList.add('redText')
        percentP.classList.remove('greenText')
        percentP.classList.add('redText')
    }

    stockInfoItems.innerHTML = "";

    tickerDiv.append(tickerNameP);
    tickerDiv.append(companyNameP);
    percentChangeDiv.append(dollarP);
    percentChangeDiv.append(amountChangeP);
    valueChangeDiv.append(percentP);
    valueChangeDiv.append(percentChangeP);

    stockInfoItems.append(tickerDiv)
    stockInfoItems.append(percentChangeDiv)
    stockInfoItems.append(valueChangeDiv)

}

// Add div elements with the following classes
// tile is-child box has-text-centered
// to div element with id #stock-info-items

// text input from search box is #search-input
// search button is #search-btn
