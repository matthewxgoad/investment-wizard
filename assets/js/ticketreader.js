let callURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=S5E23FUR0IXVEJ9R'

var searchButton = document.getELementbyId('search-input')



searchButton.addEventListener('click', buttonSubmit)

//

function buttonSubmit() {
    var userInput = button.value
    fetchStockPrice(userInput)
}

//

function fetchStockPrice(tickerName) {

    callURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+tickerName+'&interval=5min&outputsize=full&apikey=S5E23FUR0IXVEJ9R'

fetch (callURL)
  
  .then(response => response.json())
  
  .then(data => console.log(data));

  .catch(error => {
    console.error('Error:', error);
  });

}

