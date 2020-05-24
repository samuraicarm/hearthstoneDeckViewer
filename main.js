'use strict'

const accessToken = 'USrr5JuK2jzncnTkcFuu831xN24VnuPFE6'
const deckUrl = 'https://us.api.blizzard.com/hearthstone/deck/';
const deckInput = document.getElementById('deckInput');
const deckForm = document.getElementById('deckForm');
const defaultDeck = 'AAEBAaIHCLICrwSSlwPBrgOCsQPjtAObtgPLwAMLtAHtAs0DiAePlwP1pwO5rgP+rgOqrwPOrwPDtgMA';
const randomButton = document.getElementById('randomButton');
let hsDeck = [];

$(document).ready(function(){
    console.log("ready");
  });
  
$(function() {
    console.log('App loaded! Waiting for submit!');
  });

  getDeck(defaultDeck);

function watchForm() {
    console.log("watch form");
    deckForm.addEventListener('submit', e => {
    console.log("I get called after the form is submitted.");
    e.preventDefault();
    const hearthStoneDeckId = deckInput.value;
    getDeck(hearthStoneDeckId);
    console.log(hearthStoneDeckId );
    });
  }

  function getRandom() {
    randomButton.addEventListener('click', e => {
    console.log("I get called after the button is clicked");
    const arrayIndex = Math.floor(Math.random() * randomHearthstoneDeck.length);
    const randomHSDeck = randomHearthstoneDeck[arrayIndex].id;
    console.log(randomHearthstoneDeck[arrayIndex]);
    e.preventDefault();
    getDeck(randomHSDeck);
    });
  }



function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
}

function getDeck(hearthStoneDeckId) {
    const params = {
    locale: 'en_US',
    access_token: accessToken
    };
    const queryString = formatQueryParams(params)
    const url = deckUrl + hearthStoneDeckId + queryString;

    console.log(url);

    const options = {
    "headers": new Headers({
      "Authorization": "Bearer USrr5JuK2jzncnTkcFuu831xN24VnuPFE6" })
    };
   

fetch(url, options)
.then(response => {
    if (response.ok){
        return response.json();
    }
    throw new Error(response.statusText);
})
.then(responseJson => displayResults(responseJson))
.catch(err => {$('js-error-message').text(`something went wrong: ${err.message}`);
});

}

function displayResults (responseJson) {
  console.log(responseJson);
  $('#deckCards').empty();
  const deckClass = responseJson.class.name.en_US;;
  const [deckCode, keys] = responseJson.deckCode.split('locale');
  $('#deckCards').append(
   `<li><h6>Deck Class: ${deckClass}</h6></li>
   <li><h6>Deck ID: ${deckCode}</h6></li>`);

   hsDeck = responseJson.cards;
   console.log(hsDeck);
  
   hsDeck.sort((a, b) => {
    console.log(a.name.en_US)
    return a.name.en_US.localeCompare(b.name.en_US)
  });

   displayDeckDetails(hsDeck);
 
  function displayDeckDetails(hsDeck) {
  for (let i=0; i < hsDeck.length; i++){
    const name = hsDeck[i].name.en_US;
    const imageUrl = hsDeck[i].image.en_US;
    const manaCost = hsDeck[i].manaCost;
    const attack = hsDeck[i].attack;
    const health = hsDeck[i].health;
    const deckDescription = hsDeck[i].text.en_US;

    $('#deckCards').append(
      `<li><p>Card Name: ${name}</p></li>
     <li><p> Mana Cost: ${manaCost}</p></li>
      <li><p><img src= "${imageUrl}"></p></li>
      <li><p> Attack: ${attack}</p></li>
      <li><p> Health: ${health}</p></li>
      <li><p> Card Text: ${deckDescription}</p></li>
      <hr>`
    );
    $('#deckList').removeClass('hidden');
  }
 }
}



$(watchForm);
$(getRandom);
