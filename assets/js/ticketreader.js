
let callURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=S5E23FUR0IXVEJ9R'

const searchButton = document.getElementById('search-btn')


searchButton.addEventListener('click', buttonSubmit)

//

function buttonSubmit() {
    let searchInput = document.getElementById('search-input')
    let userInput = searchInput.value

    userInput = userInput.toUpperCase().trim()

    fetchStockPrice(userInput)

    // if(SOME KIND OF VERIFICATION)
    setLocalStorage(userInput)
}

//

function fetchStockPrice(tickerName) {

    callURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + tickerName + '&interval=5min&outputsize=full&apikey=S5E23FUR0IXVEJ9R'

    fetch(callURL)

        .then(response => response.json())

        .then(data => console.log(data))

        .catch(error => {
            console.log('Error:', error);
        });

        //get and pass info to populateBoxes function
        //name of company
        //



    populateBoxes(tickerName,companyName, percentChange, dollarChange)
}

function populateBoxes(tickerName, companyName, percentChange, dollarChange) {
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

    tickerNameP.innerHTML = (tickerName);
    companyNameP.innerHTML = (companyName);
    dollarP.innerHTML = ('&dollar;'+ dollarChange)
    amountChangeP.innerHTML = ("Dollar Change")
    percentP.innerHTML = (percentChange+'&percnt;')
    percentChangeP.innerHTML = ("Percent Change");


   

    tickerDiv.classList.add("tile is-child box has-text-centered");
    percentChangeDiv.classList.add("tile is-child box has-text-centered");
    valueChangeDiv.classList.add("tile is-child box has-text-centered");


    // if (stock is red) {
    //     tickerNameP.classList.remove("greenText");
    //     tickerNameP.classList.add("redText");

    //     percentP.classList.remove("greenText");
    //     percentP.classList.add("redText");

    //     dollarP.classList.remove("greenText");
    //     dollarP.classList.add("redText");
    // }

    tickerNameP.append("greenText");
    percentP.append("greenText");
    dollarP.append("greenText");

    stockInfoItems.append(tickerDiv)
    stockInfoItems.append(percentChangeDiv)
    stockInfoItems.append(valueChangeDiv)





    //add classes to divs setAttribute("class", "source")
    //add classes to ps setAttribute("class", "source")
    //add dynamic text to ps innerHTML

    //append ps to divs





    // stockInfoItems = tickerName
    // searchButton.innerHTML = "info from API"
}

// Add div elements with the following classes
// tile is-child box has-text-centered
// to div element with id #stock-info-items

// text input from search box is #search-input
// search button is #search-btn
