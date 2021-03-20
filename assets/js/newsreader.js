
// GLOBAL VARIABLES
const searchButton = document.getElementById("search-btn");
searchButton.addEventListener('click', buttonSubmit)

function buttonSubmit() {
  let searchInput = document.getElementById('search-input');
  let userInput = searchInput.value;
  userInput = userInput.toUpperCase().trim();
  storeSymbolLocal(userInput); //
  fetchStockPrice(userInput); //
  getNews(userInput);
}

function getNews(userInput) {
   // clear current News List
   $("#stock-news-items").empty();
    var url = "https://finnhub.io/api/v1/company-news?symbol="+userInput+"&from=2021-03-01&to=2021-03-09&token=c17r4k748v6sj55b4ltg"
    fetch(url)
      .then(response => response.json())
      .then(function (data) {
        console.log(data);
        for(i=0; i<4; i++) {
        var headline = data[i].headline;
        var date = dayjs.unix(data[i].datetime).format('MMMM M YYYY')
        var image = data[i].image;
        var source = data[i].source;
        var summary = data[i].summary;
        var newsurl = data[i].url;

        var newsCard = document.createElement("div");
        newsCard.setAttribute("class","tile is-child box is-12");
        newsCard.setAttribute("id", "newsStory"+i);
        var parent = document.getElementById("stock-news-items");
        parent.appendChild(newsCard);

        var dateE = document.createElement("p");
        dateE.innerHTML = "<em>" + date + "</em>";
        var newsParent = document.getElementById("newsStory"+i)
        newsParent.appendChild(dateE);
        
        var headlineE = document.createElement("p");
        headlineE.textContent = headline;
        headlineE.setAttribute("class", "title is-4");
        newsParent.appendChild(headlineE);

        var imageE = document.createElement("img");
        imageE.setAttribute("src", image);
        // imageE.setAttribute("width", "100px");  // REMOVE?
        newsParent.appendChild(imageE);

        var summaryE = document.createElement("p");
        summaryE.textContent = summary;
        summaryE.setAttribute("class", "content");
        newsParent.appendChild(summaryE);
        
        var newsurlE = document.createElement("a");
        newsurlE.textContent = "Read Full Article on " + source;
        newsurlE.setAttribute("href", newsurl);
        newsParent.appendChild(newsurlE);

        let animationID = "#newsStory"+i
        let delaytime = 200*i

    let waypoint = new Waypoint({
      element: document.querySelector(animationID),
      handler: function() {
            anime({
                targets: animationID,
                easing: 'easeOutExpo',
                translateY: [100, 0],
                opacity: [0, 1],
                delay: delaytime,
            })
            this.destroy();
      },
        context: document.querySelector('#stock-news-items'),
        offset: '100%',
    })   


        }
      })
      .catch(function () {
      });
}