import {createElement} from '../render';
import {getDifferenceTime, humanizeDateTo} from '../util';


const createPointTemplate = (point) => {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, type} = point;

  const destinationName = destination.name;
  const isFavoriteButtonClass = isFavorite ? 'event__favorite-btn--active' : '';
  const humanizedDateFrom = dateFrom !== null ? humanizeDateTo(dateFrom, 'HH mm') : '';
  const humanizedDateTo = dateTo !== null ? humanizeDateTo(dateTo, 'HH mm') : '';
  const differenceTime = getDifferenceTime(dateFrom, dateTo);
  const dateMonthDay = dateFrom !== null ? humanizeDateTo(dateFrom, 'MMM d'): '';

  return (
    `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${dateMonthDay}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destinationName}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${humanizedDateFrom}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${humanizedDateTo}</time>
                  </p>
                  <p class="event__duration">${differenceTime}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">Order Uber</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">20</span>
                  </li>
                </ul>
                <button class="event__favorite-btn ${isFavoriteButtonClass}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`
  );
};

export default class PointsView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createPointTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}