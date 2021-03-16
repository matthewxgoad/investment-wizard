// text input from search box is #search-input

// search button is #search-btn

// right side container has id #right-side

// create new div elements with the following classes
// tile is-child box
// add them to the div with id #stock-news-items

//global Variables
// var url = 
// var url = "https://newsapi.org/v2/everything?q=GME&apiKey=d95e7ff978a645b9b75fde1f0d7f51b3"

searchButton.addEventListener('click', buttonSubmit)

function buttonSubmit() {
  let searchInput = document.getElementById('search-input')
  let userInput = searchInput.value

  userInput = userInput.toUpperCase().trim()

  // if(userInput.length < 3 || userInput.length > 4)
  // alert error
  // else if (userInput != listofAllTickers)
  //alert error
  // else {}
  // localStorage.setItem('ticker', userInput)

  getNews(userInput)

}

function getNews(userInput) {
    var url = "https://finnhub.io/api/v1/company-news?symbol="+userInput+"&from=2021-03-01&to=2021-03-09&token=c17r4k748v6sj55b4ltg"
    fetch(url)
      .then(response => response.json())
      .then(function (data) {
        console.log(data);
        for(i=0; i<6; i++) {
        var headline = data[i].headline;
        var date = dayjs.unix(data[i].datetime).format('MMMM M YYYY')
        var image = data[i].image;
        var source = data[i].source;
        var summary = data[i].summary;
        var newsurl = data[i].url;

        console.log(headline+" "+date+" "+image+" "+source+" "+summary+" "+newsurl);

        var newsCard = document.createElement("div");
        // headlineE.textContent = headline;
        newsCard.setAttribute("class","tile is-child box has-text-centered");
        newsCard.setAttribute("id", "newsStory"+i);
        var parent = document.getElementById("stock-news-items");
        parent.appendChild(newsCard);
        console.log(newsCard+ " " +i)

        var headlineE = document.createElement("p");
        headlineE.textContent = headline;
        headlineE.setAttribute("class","title");
        var newsParent = document.getElementById("newsStory"+i)
        newsParent.appendChild(headlineE);

        var imageE = document.createElement("img");
        imageE.setAttribute("src", image);
        imageE.setAttribute("width", "100px");
        newsParent.appendChild(imageE);

        var sourceE = document.createElement("p");
        sourceE.textContent = source;
        newsParent.appendChild(sourceE);

        var dateE = document.createElement("p");
        dateE.textContent = date;
        newsParent.appendChild(dateE);

        var summaryE = document.createElement("p");
        summaryE.textContent = summary;
        newsParent.appendChild(summaryE);

        var newsurlE = document.createElement("a");
        newsurlE.textContent = "Full Article";
        newsurlE.setAttribute("href", newsurl);
        newsParent.appendChild(newsurlE);
        }
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