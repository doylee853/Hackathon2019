var timeout, item;
var searchBar = document.querySelector('#search-bar');
var searchURL = 'https://api.wegmans.io/products/search?query=';
var nameURL = 'https://api.wegmans.io/products/';
var suggestions = document.querySelector('#search-suggestions');
var resultsArea = document.querySelector('#results');
var key = 'f8f8d72eec2649b1a35aa192f7746c3b';


function renderResponse(res) {
    console.log(JSON.stringify(res));
     res.results.forEach(result => renderResult(result.name));
}


function renderResult(name) {
    var resultNode = document.createElement('li');
    const resultName = document.createTextNode(name);
    resultNode.appendChild(resultName);
    resultsArea.appendChild(resultNode);
}


async function getItem(item) {
    console.log('Getting item ' + item);
    const response = await fetch(searchURL + item + '&api-version=2018-10-18', {
        headers: {
            'Subscription-key': key
        }
    });
    var responseJSON = await response.json();
    renderResponse(responseJSON);
}


searchBar.addEventListener('keydown', event => {
    resultsArea.innerHTML = "";

    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    timeout = setTimeout(function() {
        getItem(searchBar.value);
    }, 600);
});