// text input from search box is #search-input

// search button is #search-btn

// right side container has id #right-side

// create new div elements with the following classes
// tile is-child box
// add them to the div with id #stock-news-items

//global Variables
// var url = 
// var url = "https://newsapi.org/v2/everything?q=GME&apiKey=d95e7ff978a645b9b75fde1f0d7f51b3"
function getNews() {
    var url = "https://newsapi.org/v2/everything?q=GME&apiKey=d95e7ff978a645b9b75fde1f0d7f51b3"
    fetch(url)
      .then(response => response.json())
      .then(function (data) {
        console.log(data);
      })
      .catch(function () {
      });
  }

getNews();

//functions
// const searchButton is already definied in ticketreader.js
// const searchButton = document.getElementById('search-btn')
// searchButton.addEventListener('click', buttonSubmit)
//
// function buttonSubmit() is already definied in ticketreader.js
// function buttonSubmit() {
//     let searchInput = document.getElementById('search-input')
//     let userInput = searchInput.value
//     userInput = userInput.toUpperCase().trim()
//     fetchStockPrice(userInput)
// }
// const searchButton = document.getElementById('search-btn')
// searchButton.addEventListener('click', buttonSubmit)
// function buttonSubmit() {
//     let searchInput = document.getElementById('search-input')
//     let userInput = searchInput.value
//     userInput = userInput.toUpperCase().trim()
//     fetchStockPrice(userInput)
// }

//eventlisteners