
let callURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=S5E23FUR0IXVEJ9R'

const searchButton = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')

searchInput.addEventListener("keypress", function (e) {
    if (e.key === 'Enter')
        buttonSubmit();
});
searchButton.addEventListener('click', buttonSubmit)

//

function buttonSubmit() {
    let searchInput = document.getElementById('search-input')
    let userInput = searchInput.value

    userInput = userInput.toUpperCase().trim()

    // else if (userInput != listofAllTickers)
    //alert error
    // else {}
    storeSymbolLocal(userInput); // Stores user input to localStorage
    //
    fetchStockPrice(userInput);

}

//the first call is to get the stock price changes
//the second call is to get the name of the company

function fetchStockPrice(tickerName) {

    removeButtons();
    getStoredSymbols();
    callURL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + tickerName + '&apikey=S5E23FUR0IXVEJ9R'

    fetch(callURL)
        //this is the original fetch
        .then(response => response.json())
        //this fetch gets the price action
        .then(data => {
            let stockInfo = data['Global Quote']

            //calling the below function with an additional fetch to a different API to get company name
            getCompanyName(stockInfo)

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

            // let tickerNameData = data
            if (tickerNameData == "") {
                alert("Couldn't find that stock, please try again!")
            } else {
                populateBoxes(stockInfo, tickerNameData)
            }
        })
        
        .catch (error => {
        console.log('Error:', error);
    });
}

function populateBoxes(stockInfo, tickerNameData) {

    const stockInfoItems = document.getElementById('stock-info-items')
    const tickerDiv = document.createElement("div")
    const percentChangeDiv = document.createElement("div")
    const valueChangeDiv = document.createElement("div")
    const currentStockPriceDiv = document.createElement("div")

    const tickerNameP = document.createElement("p")
    const companyNameP = document.createElement("p")
    const dollarP = document.createElement("p")
    const amountChangeP = document.createElement("p")
    const percentP = document.createElement("p")
    const percentChangeP = document.createElement("p")
    const currentStockPriceTitle = document.createElement("p")
    const currentStockPriceAPI = document.createElement("p")

    tickerNameP.classList.add("title");
    companyNameP.classList.add("subtitle");
    dollarP.classList.add("title");
    amountChangeP.classList.add("subtitle");
    percentP.classList.add("title");
    percentChangeP.classList.add("subtitle");
    
    currentStockPriceTitle.classList.add("subtitle");
    currentStockPriceAPI.classList.add("title");
    
    tickerNameP.classList.add("title");
    companyNameP.classList.add("subtitle");
    dollarP.classList.add("title");
    amountChangeP.classList.add("subtitle");
    percentP.classList.add("title");
    percentChangeP.classList.add("subtitle");

    //All the data from the API is styled green UNLESS its negative for the day
    tickerNameP.classList.add("greenText");
    percentP.classList.add("greenText");
    dollarP.classList.add("greenText");
    currentStockPriceAPI.classList.add("greenText");

    //get all the info necessary from the API
    let ticker = stockInfo["01. symbol"]
    let dollarChange = stockInfo["09. change"]
    let percentChange = stockInfo["10. change percent"]
    let companyName = tickerNameData["Name"]
    let currentPrice = stockInfo["05. price"]


    //THIRD attempt ot round numbers
    //Since the JSON API returns an Array, I removed the final two elements from the string so that it appears to round to the second decimal and cleans up the page significantly
    dollarChange = dollarChange.substring(0, dollarChange.length - 2);
    percentChange = percentChange.substring(0, percentChange.length - 3);
    currentPrice = currentPrice.substring(0, currentPrice.length - 2);

    //add all the text to every element
    tickerNameP.innerHTML = (ticker);
    companyNameP.innerHTML = (companyName);
    dollarP.innerHTML = ('&dollar;' + dollarChange)
    amountChangeP.innerHTML = ("Dollar Change")
    percentP.innerHTML = (percentChange + '&percnt;')
    percentChangeP.innerHTML = ("Percent Change");
    currentStockPriceTitle.innerHTML = ("Current Price");
    currentStockPriceAPI.innerHTML = ('&dollar;'+currentPrice);


    tickerDiv.classList.add("tile", "is-child", "box","has-text-centered");
    currentStockPriceDiv.classList.add("tile", "is-child", "box","has-text-centered");
    
    percentChangeDiv.classList.add("tile", "is-child", "box", "has-text-centered");
    valueChangeDiv.classList.add("tile", "is-child", "box", "has-text-centered");


    //if the first index of the string is negative, it this if statement changes all the classes from Green to Red, showing that its negative for the day 
    if (dollarChange.charAt(0) == "-") {
        tickerNameP.classList.remove('greenText')
        tickerNameP.classList.add('redText')
        dollarP.classList.remove('greenText')
        dollarP.classList.add('redText')
        percentP.classList.remove('greenText')
        percentP.classList.add('redText')
        currentStockPriceAPI.classList.remove('greenText')
        currentStockPriceAPI.classList.add('redText')

    }

    //this removes the current cards (if any) from the parent dive
    stockInfoItems.innerHTML = "";

    //this builds the P elements to their respective divs
    tickerDiv.append(tickerNameP);
    tickerDiv.append(companyNameP);
    currentStockPriceDiv.append(currentStockPriceAPI)
    currentStockPriceDiv.append(currentStockPriceTitle)
    
    percentChangeDiv.append(dollarP);
    percentChangeDiv.append(amountChangeP);
    valueChangeDiv.append(percentP);
    valueChangeDiv.append(percentChangeP);

    //this build the divs in the parent element
    stockInfoItems.append(tickerDiv)
    stockInfoItems.append(currentStockPriceDiv)
    stockInfoItems.append(percentChangeDiv)
    stockInfoItems.append(valueChangeDiv)

    console.log(stockInfo)
    console.log(tickerNameData)

    createChart(ticker)
}

// The following code is all related to chart.js

function createChart(ticker) {

    let myChart = document.getElementById("myChart").getContext('2d');
    let hour = dayjs().format('H')

    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + ticker + '&interval=60min&apikey=S5E23FUR0IXVEJ9R')
        .then(response => response.json())
        .then(data => {
            return data
        }
        )
        .catch(error => {
            console.log('Error:', error);
        });


    console.log(hour)
    console.log(data)

    let stockPricingChart = new Chart(myChart, {
        type: 'line', //bar, horizontalbar, pie, line, doughnut, radar, polarArea
        data: {
            labels: ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'],
            datasets: [
                {
                    label: 'Price',
                    data: [200, 300, 400, 500, 600, 700, 800, 50, 900],
                    // backgroundColor: 'blue'
                    backgroundColor: [
                        'rgba(46, 204, 113, 0.5)'
                    ]
                }
            ],
            options: {
                title: {
                    display: true,
                    text: 'Todays Price Movement'
                    // fontSize: 25;

                },
                legend: {
                    position: 'right'
                }
            },

        }


    })


}


// Add div elements with the following classes
// tile is-child box has-text-centered
// to div element with id #stock-info-items

// text input from search box is #search-input
// search button is #search-btn

