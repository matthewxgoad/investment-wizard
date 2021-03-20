const searchInput = document.getElementById('search-input')

searchInput.addEventListener("keypress", function (e) {
    if (e.key === 'Enter')
        buttonSubmit();
});


//the first fetch API call is to get the stock price changes
//the second API call is to get the name of the company
function fetchStockPrice(tickerName) {

    removeButtons();
    getStoredSymbols();
    let callURL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + tickerName + '&apikey=S5E23FUR0IXVEJ9R'

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
    fetch('https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + ticker + '&apikey=ZT0JKRPGS8C92ST0')
        .then(response => response.json())
        .then(tickerNameData => {

            // let tickerNameData = data
            if (tickerNameData == "") {
                alert("Couldn't find that stock, please try again!")
            } else {
                populateBoxes(stockInfo, tickerNameData)
            }
        })

        .catch(error => {
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
    currentStockPriceAPI.innerHTML = ('&dollar;' + currentPrice);

    //adding classes to each div styled by Bulma
    tickerDiv.classList.add("tile", "is-child", "box", "has-text-centered");
    currentStockPriceDiv.classList.add("tile", "is-child", "box", "has-text-centered");
    percentChangeDiv.classList.add("tile", "is-child", "box", "has-text-centered");
    valueChangeDiv.classList.add("tile", "is-child", "box", "has-text-centered");

    //adding an ID for animation
    tickerDiv.setAttribute('id', 'tickerDiv');
    currentStockPriceDiv.setAttribute('id', 'currentStockPriceDiv');
    valueChangeDiv.setAttribute('id', 'valueChangeDiv');
    percentChangeDiv.setAttribute('id', 'percentChangeDiv')


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

    //adding styled P elements to each div
    percentChangeDiv.append(dollarP);
    percentChangeDiv.append(amountChangeP);
    valueChangeDiv.append(percentP);
    valueChangeDiv.append(percentChangeP);

    //this build the divs in the parent element
    stockInfoItems.append(tickerDiv)
    stockInfoItems.append(currentStockPriceDiv)
    stockInfoItems.append(percentChangeDiv)
    stockInfoItems.append(valueChangeDiv)


    let waypoint = new Waypoint({
        element: document.querySelector('#tickerDiv'),
        handler: function () {
            anime({
                targets: '#tickerDiv',
                easing: 'easeOutExpo',
                translateX: [50, 0],
                opacity: [0, 1],
                delay: 100,
            })
            this.destroy();
        },
        context: document.querySelector('#stock-info-items'),
        offset: '100%',
    })


    let waypoint2 = new Waypoint({
        element: document.querySelector('#currentStockPriceDiv'),
        handler: function () {
            anime({
                targets: '#currentStockPriceDiv',
                easing: 'easeOutExpo',
                translateX: [50, 0],
                opacity: [0, 1],
                delay: 150,
            })
            this.destroy();
        },
        context: document.querySelector('#stock-info-items'),
        offset: '100%',
    })

    let waypoint3 = new Waypoint({
        element: document.querySelector('#valueChangeDiv'),
        handler: function () {
            anime({
                targets: '#valueChangeDiv',
                easing: 'easeOutExpo',
                translateX: [50, 0],
                opacity: [0, 1],
                delay: 200,
            })
            this.destroy();
        },
        context: document.querySelector('#stock-info-items'),
        offset: '100%',
    })

    let waypoint4 = new Waypoint({
        element: document.querySelector('#percentChangeDiv'),
        handler: function () {
            anime({
                targets: '#percentChangeDiv',
                easing: 'easeOutExpo',
                translateX: [50, 0],
                opacity: [0, 1],
                delay: 250,
            })
            this.destroy();
        },
        context: document.querySelector('#stock-info-items'),
        offset: '100%',
    })

    dailyInfo(ticker);
}


//this function calls intraday stock info then passes it to the below chart function to autopopulate the Data based on the user info
function dailyInfo(ticker) {

    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + ticker + '&interval=60min&apikey=S8HD5UAIYRL35ZNF')
        .then(response => response.json())
        .then(dailyPrice => {

            createGraph(dailyPrice)
        }
        )
        .catch(error => {
            console.log('Error:', error);
        });
}

//this function creates the graph using chart.js then populates all the info from the API dynamically then reveals the finished chart with an animation from anime.js

function createGraph(dailyPrice) {

    function createGraphh() {

        let myChart = document.getElementById("myChart").getContext('2d');
        let hour = dayjs().format('H')
        // let hour = dayjs().format('H')

        let yesterdaysDate = dayjs().subtract(1, 'day').format("YYYY-MM-DD")

        //setting the hour to call the API per hour
        let hour1 = yesterdaysDate + " 05:00:00"
        let hour2 = yesterdaysDate + " 06:00:00"
        let hour3 = yesterdaysDate + " 07:00:00"
        let hour4 = yesterdaysDate + " 08:00:00"
        let hour5 = yesterdaysDate + " 09:00:00"
        let hour6 = yesterdaysDate + " 10:00:00"
        let hour7 = yesterdaysDate + " 11:00:00"
        let hour8 = yesterdaysDate + " 12:00:00"
        let hour9 = yesterdaysDate + " 13:00:00"
        let hour10 = yesterdaysDate + " 14:00:00"
        let hour11 = yesterdaysDate + " 15:00:00"
        let hour12 = yesterdaysDate + " 16:00:00"
        let hour13 = yesterdaysDate + " 17:00:00"
        let hour14 = yesterdaysDate + " 18:00:00"
        let hour15 = yesterdaysDate + " 19:00:00"
        let hour16 = yesterdaysDate + " 20:00:00"

        //the actual format for API call to store the time
        //after each variable, I round the number to two decimals by eliminating the 3rd and 4th decimal
        let sixAM = dailyPrice["Time Series (60min)"][hour1]["4. close"]
        sixAM = sixAM.substring(0, sixAM.length - 2);
        let sevenAM = dailyPrice["Time Series (60min)"][hour2]["4. close"]
        sevenAM = sevenAM.substring(0, sevenAM.length - 2);
        let eightAM = dailyPrice["Time Series (60min)"][hour3]["4. close"]
        eightAM = eightAM.substring(0, eightAM.length - 2);
        let nineAM = dailyPrice["Time Series (60min)"][hour4]["4. close"]
        nineAM = nineAM.substring(0, nineAM.length - 2);
        let tenAM = dailyPrice["Time Series (60min)"][hour5]["4. close"]
        tenAM = tenAM.substring(0, tenAM.length - 2);
        let elevenAM = dailyPrice["Time Series (60min)"][hour6]["4. close"]
        elevenAM = elevenAM.substring(0, elevenAM.length - 2);
        let twelvePM = dailyPrice["Time Series (60min)"][hour7]["4. close"]
        twelvePM = twelvePM.substring(0, twelvePM.length - 2);
        let onePM = dailyPrice["Time Series (60min)"][hour8]["4. close"]
        onePM = onePM.substring(0, onePM.length - 2);
        let twoPM = dailyPrice["Time Series (60min)"][hour9]["4. close"]
        twoPM = twoPM.substring(0, twoPM.length - 2);
        let threePM = dailyPrice["Time Series (60min)"][hour10]["4. close"]
        threePM = threePM.substring(0, threePM.length - 2);
        let fourPM = dailyPrice["Time Series (60min)"][hour11]["4. close"]
        fourPM = fourPM.substring(0, fourPM.length - 2);
        let fivePM = dailyPrice["Time Series (60min)"][hour12]["4. close"]
        fivePM = fivePM.substring(0, fivePM.length - 2);
        let sixPM = dailyPrice["Time Series (60min)"][hour13]["4. close"]
        sixPM = sixPM.substring(0, sixPM.length - 2);
        let sevenPM = dailyPrice["Time Series (60min)"][hour14]["4. close"]
        sevenPM = sevenPM.substring(0, sevenPM.length - 2);
        let eightPM = dailyPrice["Time Series (60min)"][hour15]["4. close"]
        eightPM = eightPM.substring(0, eightPM.length - 2);
        let ninePM = dailyPrice["Time Series (60min)"][hour16]["4. close"]
        ninePM = ninePM.substring(0, ninePM.length - 2);

        let stockPricingChart = new Chart(myChart, {
            type: 'line', //bar, horizontalbar, pie, line, doughnut, radar, polarArea
            data: {
                labels: ['5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
                datasets: [
                    {
                        label: 'Price',
                        data: [sixAM, sevenAM, eightAM, nineAM, tenAM, elevenAM, onePM, twoPM, threePM, fourPM, fivePM, sixPM, sevenPM, eightPM, ninePM],
                        // backgroundColor: 'blue'
                        backgroundColor: [
                            'rgba(46, 204, 113, 0.5)'
                        ]
                    }
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: dailyPrice["Meta Data"]["2. Symbol"] + ": Yesterday's Price Movement"

                },
                legend: {
                    display: false,
                    position: 'bottom'
                },
                drawOnChartArea: false,
            }
        })



        document.getElementById("myChart").classList.remove("chart-hidden")
        document.getElementById("myChart").classList.add("chart-show")

        let waypoint = new Waypoint({
            element: document.querySelector('#myChart'),
            handler: function () {
                anime({
                    targets: '#myChart',
                    easing: 'easeOutExpo',
                    translateY: [100, 0],
                    opacity: [0, 1],
                    delay: 400,
                })
                this.destroy();
            },
            context: document.querySelector('#chartContainer'),
            offset: '100%',
        })


        //close function
    }

    createGraphh()
}
