import { tempIcon,windIcon,humidityIcon } from "./svgIcons.js";

// Эта функция создает новый HTML-элемент
function createElement(tag, nameClass = '', contentText = '') {
  const element = document.createElement(tag);
  element.className = nameClass;
  element.textContent = contentText;
  return element;
}

export function getErrorCard() {
  const errorCard = createElement('div', 'card card__error full');
  const errorSpanTop = createElement('span', 'card__error-span');
  errorSpanTop.textContent = 'Вы ввели неккоректные данные';
  const errorSpanBottom = createElement('span', 'card__error-span');
  errorSpanBottom.textContent = 'Попробуйте еще раз';
  const errorImg = createElement('img', 'card__error-img');
  errorImg.src = 'img/sad.png';
  errorImg.alt = 'Грустный смайлик';

  errorCard.append(errorSpanTop, errorSpanBottom, errorImg);
  return errorCard;
}

// Создание целого контейнера
export function getNewCard() {
  // Создаем саму карточку
  const card = createElement('div', 'card');
  const cardInner = createElement('div', 'card__inner');
  
  // Создаем div который будет контейнером для всей верхней части карточки
  const cardHead = createElement('div', 'card__head');

  // Создаем левый div в котором будет иконка, заголовок и описание 
  const cardHeadLeft = createElement('div', 'card__head-left');
  const icon = createElement('div', 'card__icon');
  const headLeftTitle = createElement('div', 'card__head-left-title');
  const title = createElement('h3', 'card__title');
  const desc = createElement('span', 'card__desc');

  headLeftTitle.append(title, desc);
  cardHeadLeft.append(icon, headLeftTitle);

  // правый блок заголовка
  const cardHeadRight = createElement('div', 'card__head-right card-param');
  cardHeadRight.innerHTML = tempIcon;
  const tempText = createElement('span', 'card-param__text');
  const tempValue = createElement('span', 'card-param-value card-param-value_temp');
  tempText.append(tempValue, document.createTextNode(' °C'));
  cardHeadRight.append(tempText);

  //сборка заголовка
  cardHead.append(cardHeadLeft, cardHeadRight);

  //подвал карточки
  const cardFooter = createElement('div', 'card__footer');
  const footerLeft = createElement('div', 'card__footer-left card-param');
  const footerRight = createElement('div', 'card__footer-right card-param');

  // информация о ветре
  const windText = createElement('span', 'card-param-text_footer');
  const windValue = createElement('span', 'card-param-value card-param-value_wind');
  windText.append(windValue, document.createTextNode(` м/с`));

  footerRight.innerHTML = humidityIcon;

  const humidityText = createElement('span', 'card-param-text_footer');
  const humidityValue = createElement('span', 'card-param-value card-param-value_humidity');
  humidityText.append(humidityValue, document.createTextNode(` %`));

  //Добавление элементов в подвал
  footerLeft.innerHTML = windIcon;
  footerLeft.append(windText);
  footerRight.append(humidityText);
  cardFooter.append(footerLeft, footerRight);

  //собираем внутреннюю структуру карточки
  cardInner.append(cardHead, cardFooter);
  card.append(cardInner);

  //возвращаем объекты со ссылками на нужные элементы
  return {
    card,
    icon,
    title,
    temp: tempValue,
    desc,
    wind: windValue,
    humidity: humidityValue
  }
};


