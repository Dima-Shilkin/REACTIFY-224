import {getNewCard, getErrorCard} from "./createCard.js";

const APIKEY = '9708c9c3a4929e48795cbc2e1458f110';

const cardsBox = document.getElementById('cards-box');
const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-form-input');
let currentCard = null;


async function getWeatherData(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric&lang=ru`);
    
    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    
    // Возвращаю null, чтобы предотвратить дальнейшие ошибки
    return null;
  }
}

// Функция для удаления элементов с классом 'card__error'
function removeElementsByClass(className) {
  const elements = cardsBox.querySelectorAll(`.${className}`);
  elements.forEach(element => {
    cardsBox.removeChild(element);
  });
};

locationForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const newCard = getNewCard();

  const location = locationInput.value.trim();
  locationInput.value = '';

  cardsBox.prepend(newCard.card);

  newCard.card.classList.add('loading');

  try {
    const data = await getWeatherData(location);
    if (!data) {
      throw new Error('Не удалось получить данные о погоде.');
    }

    newCard.icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;

    newCard.title.textContent = data.name;
    newCard.desc.textContent = data.weather[0].description;
    newCard.temp.textContent = Math.round(data.main.temp);
    newCard.wind.textContent = data.wind.speed.toFixed(1);
    newCard.humidity.textContent = data.main.humidity;
    
    setTimeout(function() {
      document.querySelector('.app__container').classList.add('app__container_top');

      document.body.style.backgroundImage = `url(img/bg/${data.weather[0].icon}.jpeg)`;
      if (currentCard !== null) {
        currentCard.card.classList.add('glass');
      }

      currentCard = newCard;

      newCard.card.classList.remove('loading');
      newCard.card.classList.add('full');
      
      
      removeElementsByClass('card__error');
    }, 600);
  } catch (error) {
    // Обработка ошибки
    newCard.card.classList.remove('loading');

    while (cardsBox.firstChild) {
      cardsBox.removeChild(cardsBox.firstChild);
    }

    const errorCard = getErrorCard();
    cardsBox.append(errorCard);
  }
});

const cardElements = getNewCard();

