import {createElement} from '../render';
import {enumerateTypesTrip, humanizeDate} from '../util';
import {tripTypes} from '../const';

const createEditForm = (point, destinations) => {
  let {dateFrom, dateTo} = point;
  dateFrom = humanizeDate(dateFrom, 'd/MM/YY HH:mm');
  dateTo = humanizeDate(dateTo, 'd/MM/YY HH:mm');
  const pointDestination = destinations.find((destination) => destination.id === point.destination);

  return (`
<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${tripTypes.map((type) => enumerateTypesTrip(type, point)).join('')}

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${point.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${pointDestination.name} list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                        <label class="event__offer-label" for="event-offer-luggage-1">
                          <span class="event__offer-title">Add luggage</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">50</span>
                        </label>
                      </div>

                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
                        <label class="event__offer-label" for="event-offer-comfort-1">
                          <span class="event__offer-title">Switch to comfort</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">80</span>
                        </label>
                      </div>

                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                        <label class="event__offer-label" for="event-offer-meal-1">
                          <span class="event__offer-title">Add meal</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">15</span>
                        </label>
                      </div>

                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
                        <label class="event__offer-label" for="event-offer-seats-1">
                          <span class="event__offer-title">Choose seats</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">5</span>
                        </label>
                      </div>

                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                        <label class="event__offer-label" for="event-offer-train-1">
                          <span class="event__offer-title">Travel by train</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">40</span>
                        </label>
                      </div>
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${pointDestination.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${pointDestination.pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="Event photo">`)}

                      </div>
                    </div>
                  </section>
                </section>
              </form>`
  );
};
export default class EditFormView {
  constructor(point, destinations) {
    this.point = point;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEditForm(this.point, this.destinations);
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
