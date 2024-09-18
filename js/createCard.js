// Эта функция создает новый HTML-элемент
function createElement(tag, nameClass = '', contentText = '') {
  const element = document.createElement(tag);
  if (nameClass) element.className = nameClass;
  if (contentText) element.textContent = contentText;
  return element;
}

export function getErrorCard() {
  const errorCard = createElement('div', 'card card__error full');
  const errorSpan1 = createElement('span', 'card__error-span');
  errorSpan1.textContent = 'Вы ввели неккоректные данные';
  const errorSpan2 = createElement('span', 'card__error-span');
  errorSpan2.textContent = 'Попробуйте еще раз';
  const errorImg = createElement('img', 'card__error-img');
  errorImg.src = 'img/sad.png';
  errorImg.alt = 'Грустный смайлик';

  errorCard.append(errorSpan1, errorSpan2, errorImg);
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
  const tempIcon = `
  <svg class="card-param__icon" viewBox="0 0 24 24" ">
                  <path
                    d="M15,16a3,3,0,1,1-3-3A3,3,0,0,1,15,16ZM16,5v5.262a7,7,0,1,1-8,0V5a4,4,0,0,1,8,0Zm-1.5,6.675a1,1,0,0,1-.5-.865V5a2,2,0,0,0-4,0v5.81a1,1,0,0,1-.5.865,5,5,0,1,0,5,0Z"/>
                </svg>
  `
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
  const windIcon = `
  <svg class="card-param__icon card-param-icon_footer" viewBox="0 0 800 800">
                  <path
                    d="M616.67,442h-550a31,31,0,1,0,0,62h550A85.67,85.67,0,1,1,531,589.67V573a31,31,0,0,0-62,0v16.67c0,81.42,66.24,147.66,147.67,147.66s147.66-66.24,147.66-147.66S698.09,442,616.67,442Z"/>
                  <path
                    d="M66.67,404h550c81.42,0,147.66-66.24,147.66-147.67A148.21,148.21,0,0,0,616.67,108.67C535.24,108.67,469,174.91,469,256.33V273a31,31,0,0,0,62,0V256.33A85.52,85.52,0,1,1,616.67,342h-550a31,31,0,0,0,0,62Z"/>
                  <path
                    d="M66.67,304H310.33A120.67,120.67,0,1,0,189.67,183.33V196a31,31,0,0,0,62,0V183.33A58.67,58.67,0,1,1,310.33,242H66.67a31,31,0,0,0,0,62Z"/>
                </svg>
  `
  const windText = createElement('span', 'card-param-text_footer');
  const windValue = createElement('span', 'card-param-value card-param-value_wind');
  windText.append(windValue, document.createTextNode(` м/с`));

  const humidityIcon = `
  <svg class="card-param__icon card-param-icon_footer" viewBox="0 0 800 800">
    <path
      d="M88.63,228.84c1.68.66,41.45,16.31,69.62,24.26a298.1,298.1,0,0,0,81.65,11.31c60.5,0,115.67-17.65,169.55-34.88,71.53-22.89,139.1-44.5,215.47-23,25.1,7.08,63.21,22.07,63.7,22.27a31,31,0,0,0,22.76-57.68c-1.68-.66-41.46-16.31-69.63-24.26-94.31-26.61-174.07-1.1-251.2,23.57-71.53,22.89-139.1,44.5-215.47,23-25.14-7.09-63.32-22.12-63.71-22.27a31,31,0,0,0-22.74,57.68Z"/>
    <path
      d="M711.37,371.16c-1.68-.66-41.45-16.31-69.62-24.26-94.31-26.61-174.07-1.1-251.2,23.57-71.53,22.89-139.11,44.5-215.47,23-25.14-7.09-63.33-22.12-63.71-22.27a31,31,0,1,0-22.74,57.68c1.68.66,41.45,16.31,69.62,24.26a298.1,298.1,0,0,0,81.65,11.31c60.51,0,115.67-17.65,169.54-34.88,71.54-22.89,139.12-44.5,215.48-23,25.1,7.08,63.22,22.08,63.71,22.27a31,31,0,0,0,22.74-57.68Z"/>
    <path
      d="M711.37,571.16c-1.68-.66-41.45-16.31-69.62-24.26-94.31-26.61-174.07-1.1-251.2,23.57-71.53,22.89-139.1,44.5-215.47,23-25.14-7.09-63.33-22.12-63.71-22.27a31,31,0,1,0-22.74,57.68c1.68.66,41.45,16.31,69.62,24.26a298.1,298.1,0,0,0,81.65,11.31c60.51,0,115.67-17.65,169.54-34.88,71.54-22.89,139.12-44.5,215.48-23,25.1,7.08,63.22,22.08,63.71,22.27a31,31,0,0,0,22.74-57.68Z"/>
  </svg>
  `
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


