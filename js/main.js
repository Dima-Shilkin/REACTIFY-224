import {getNewCard} from "./createCard.js";

const APIKEY = '91989e47a0ee54ffd2d6b0585df089da';

const cardsBox = document.getElementById('cards-box');
const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-form-input');
let currentCard = null;


async function getWeatherData(location) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric&lang=ru`);

  const data = await response.json();

  return data;
}


locationForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const newCard = getNewCard();

  const location = locationInput.value.trim();
  locationInput.value = '';

  cardsBox.prepend(newCard.card);

   setTimeout(async function(){
    newCard.card.classList.add('loading');

    const data = await getWeatherData(location);

    newCard.icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`

    newCard.title.textContent = data.name;
    newCard.desc.textContent = data.weather[0].description;
    newCard.temp.textContent = data.main.temp;
    newCard.wind.textContent = data.wind.speed;
    newCard.humidity.textContent = data.main.humidity;

    console.log(data);

    setTimeout(function() {
      document.querySelector('.app__container').classList.add('app__container_top');

      document.body.style.backgroundImage = `url(img/bg/${data.weather[0].icon}.jpeg)`;
      if (currentCard !== null) {
        currentCard.card.classList.add('glass');
      }

      currentCard = newCard;

      newCard.card.classList.remove('loading');
      newCard.card.classList.add('full');
    }, 600);
  },30)
})
