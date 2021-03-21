
// const searchButton = document.getElementById('search-btn')
// const searchInput = document.getElementById('search-input')

// searchInput.addEventListener("keypress", function (e) {
//     if (e.key === 'Enter')
//         buttonSubmit();
// });

// searchButton.addEventListener('click', buttonSubmit)


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

        .catch(error => {
            console.log('Error:', error);
        });
}

function populateBoxes(stockInfo, tickerNameData) {

    //creating variables for the elements and DIVS we needed to create
    
    const rightSideDiv = document.getElementById('right-side')
    const stockInfoItems = document.getElementById('stock-info-items')
    const titleDiv = document.createElement("div")
    const div1 = document.createElement("div")
    const div2 = document.createElement("div")
    const div3 = document.createElement("div")
    const div4 = document.createElement("div")

    //creating variables for the paragraph elements that store the information
    const titleDivText = document.createElement("p")
    const div1p1 = document.createElement("p")
    const div1p2 = document.createElement("p")
    const div2p1 = document.createElement("p")
    const div2p2 = document.createElement("p")
    const div3p1 = document.createElement("p")
    const div3p2 = document.createElement("p")
    const div4p1 = document.createElement("p")
    const div4p2 = document.createElement("p")

    //added classes to the paragraph elements
    titleDivText.classList.add("title");
    div1p1.classList.add("title");
    div1p2.classList.add("subtitle");
    div2p1.classList.add("title");
    div2p2.classList.add("subtitle");
    div3p1.classList.add("title");
    div3p2.classList.add("subtitle");
    div4p1.classList.add("subtitle");
    div4p2.classList.add("title");
    div1p1.classList.add("title");
    div1p2.classList.add("subtitle");
    div2p1.classList.add("title");
    div2p2.classList.add("subtitle");
    div3p1.classList.add("title");
    div3p2.classList.add("subtitle");

    //All the data from the API is styled green UNLESS its negative for the day
    div1p1.classList.add("greenText");
    div3p1.classList.add("greenText");
    div2p1.classList.add("greenText");
    div4p2.classList.add("greenText");

    //get all the info necessary from the API
    let ticker = stockInfo["01. symbol"]
    let dollarChange = stockInfo["09. change"]
    let percentChange = stockInfo["10. change percent"]
    let companyName = tickerNameData["Name"]
    let currentPrice = stockInfo["05. price"]
    let peRatio = stockInfo["PERatio"]
    let fiftyWeekHigh = stockInfo["52WeekHigh"]
    let fiftyWeekLow = stockInfo["52WeekLow"]
    let analystTargetPrice = stockInfo["AnalystTargetPrice"]

    //THIRD attempt ot round numbers
    //Since the JSON API returns an Array, I removed the final two elements from the string so that it appears to round to the second decimal and cleans up the page significantly
    dollarChange = dollarChange.substring(0, dollarChange.length - 2);
    percentChange = percentChange.substring(0, percentChange.length - 3);
    currentPrice = currentPrice.substring(0, currentPrice.length - 2);

    //add all the text to every element
    div1p1.innerHTML = (ticker);
    div1p2.innerHTML = (companyName);
    div2p1.innerHTML = ('&dollar;' + dollarChange)
    div2p2.innerHTML = ("Dollar Change")
    div3p1.innerHTML = (percentChange + '&percnt;')
    div3p2.innerHTML = ("Percent Change");
    div4p1.innerHTML = ("Current Price");
    div4p2.innerHTML = ('&dollar;' + currentPrice);
    titleDivText.innerHTML = (ticker+" • " + companyName+" • "+currentPrice);

    //adding classes to each div styled by Bulma
    div1.classList.add("tile", "is-child", "box", "has-text-centered");
    div2.classList.add("tile", "is-child", "box", "has-text-centered");
    div3.classList.add("tile", "is-child", "box", "has-text-centered");
    div4.classList.add("tile", "is-child", "box", "has-text-centered");
    titleDiv.classList.add("tile","is-vertical", "is-child", "box", "has-text-centered")



    //adding an ID for animation
    div1.setAttribute('id', 'tickerDiv');
    div2.setAttribute('id', 'currentStockPriceDiv');
    div3.setAttribute('id', 'valueChangeDiv');
    div4.setAttribute('id', 'percentChangeDiv')
    titleDiv.setAttribute('id', 'title-div')



    //if the first index of the string is negative, it this if statement changes all the classes from Green to Red, showing that its negative for the day 
    if (dollarChange.charAt(0) == "-") {
        div1p1.classList.remove('greenText')
        div1p1.classList.add('redText')
        div2p1.classList.remove('greenText')
        div2p1.classList.add('redText')
        div3p1.classList.remove('greenText')
        div3p1.classList.add('redText')
        div4p2.classList.remove('greenText')
        div4p2.classList.add('redText')

    }

    //this removes the current cards (if any) from the parent dive
    stockInfoItems.innerHTML = "";

    //this builds the P elements to their respective divs
    div1.append(div1p1);
    div1.append(div1p2);
    div2.append(div4p2)
    div2.append(div4p1)
    div3.append(div3p1);
    div3.append(div3p2);
    div4.append(div2p1);
    div4.append(div2p2);
    titleDiv.append(titleDivText)

 
    //this build the divs in the parent element
    rightSideDiv.append(titleDiv)
    stockInfoItems.append(div1)
    stockInfoItems.append(div2)
    stockInfoItems.append(div3)
    stockInfoItems.append(div4)



    // let waypoint0 = new Waypoint({
    //     element: document.querySelector('#title-div'),
    //     handler: function () {
    //         anime({
    //             targets: '#title-div',
    //             easing: 'easeOutExpo',
    //             translateY: [100, 0],
    //             opacity: [0, 1],
    //             delay: 100,
    //         })
    //         this.destroy();
    //     },
    //     context: document.querySelector('#stock-info-items'),
    //     offset: '100%',
    // })

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

    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + ticker + '&interval=60min&apikey=S5E23FUR0IXVEJ9R')
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
                    text: "Yesterday's Price Movement"
                    // fontSize: 25;

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


//
// REMOVE THIS LATER?
// function buttonSubmit() {
//     let searchInput = document.getElementById('search-input')
//     let userInput = searchInput.value

//     userInput = userInput.toUpperCase().trim()

//     // else if (userInput != listofAllTickers)
//     //alert error
//     // else {}
//     storeSymbolLocal(userInput); // Stores user input to localStorage
//     //
//     fetchStockPrice(userInput);

// }