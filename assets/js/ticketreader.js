
let callURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=S5E23FUR0IXVEJ9R'

const searchButton = document.getElementById('search-btn')


searchButton.addEventListener('click', buttonSubmit)

//

function buttonSubmit() {
    let searchInput = document.getElementById('search-input')
    let userInput = searchInput.value

    userInput = userInput.toUpperCase().trim()

    // if(userInput.length < 3 || userInput.length > 4)
    // alert error
    // else if (userInput != listofAllTickers)
    //alert error
    // else {}
    localStorage.setItem('ticker', userInput)

    fetchStockPrice(userInput)

}

//this function makes two API calls
//the first call is to get the stock price changes
//the second call is to get the name of the company only

function fetchStockPrice(tickerName) {

    // callURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + tickerName + '&interval=5min&outputsize=compact&apikey=S5E23FUR0IXVEJ9R'

    callURL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + tickerName + '&apikey=S5E23FUR0IXVEJ9R'

    //this function contains a second fetch within a function which is nested underneath the primary fetch

    function getCompanyName(tickerName) {
        fetch('https://www.alphavantage.co/query?function=OVERVIEW&symbol='+tickerName+'&apikey=S5E23FUR0IXVEJ9R')
        .then(response => response.json())
            .then(data => {
                console.log(data)
                let tickerName = data['Name']
                return tickerName
            }
            )}

    fetch(callURL)
            //this is the original fetch
        .then(response => response.json())
        //this fetch gets the price action
        //THEN calls a function which contains a second fetch (above)
        .then(data => {
            console.log(data)
            let stockInfo = data['Global Quote']
            
            //calling the above function with an additional fetch to a different API to get company name
            getCompanyName(tickerName)
            //then passes the "tickerName" to the populateBoxes function
            populateBoxes(stockInfo, tickerName)
            
        })

        .catch(error => {
            console.log('Error:', error);
        });

    //get and pass info to populateBoxes function
    //name of company



}

function populateBoxes(stockInfo, tickerName)
{
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

    tickerNameP.innerHTML = (ticker);
    companyNameP.innerHTML = (tickerName);
    dollarP.innerHTML = ('&dollar;'+ dollarChange) 
    amountChangeP.innerHTML = ("Dollar Change")
    percentP.innerHTML = ('&percnt;'+percentChange)
    percentChangeP.innerHTML = ("Percent Change");


    tickerDiv.classList.add("tile");
    tickerDiv.classList.add("is-child");
    tickerDiv.classList.add("box");
    tickerDiv.classList.add("has-text-centered");
    percentChangeDiv.classList.add("tile", "is-child", "box", "has-text-centered");
    valueChangeDiv.classList.add("tile", "is-child", "box", "has-text-centered");


    // if (stock is red) {
    //     tickerNameP.classList.remove("greenText");
    //     tickerNameP.classList.add("redText");

    //     percentP.classList.remove("greenText");
    //     percentP.classList.add("redText");

    //     dollarP.classList.remove("greenText");
    //     dollarP.classList.add("redText");
    // }


    tickerDiv.append(tickerNameP);
    tickerDiv.append(companyNameP);
    percentChangeDiv.append(dollarP);
    percentChangeDiv.append(amountChangeP);
    valueChangeDiv.append(percentP);
    valueChangeDiv.append(percentChangeP);


    stockInfoItems.append(tickerDiv)
    stockInfoItems.append(percentChangeDiv)
    stockInfoItems.append(valueChangeDiv)



    // stockInfoItems = tickerName
    // searchButton.innerHTML = "info from API"
}

// Add div elements with the following classes
// tile is-child box has-text-centered
// to div element with id #stock-info-items

// text input from search box is #search-input
// search button is #search-btn
