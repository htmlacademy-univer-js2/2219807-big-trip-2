import {enumerateTypesTrip, reformatOfferTitles, humanizeDate} from '../utils/util';
import {TRIP_TYPES} from '../utils/const';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import {mockDestinations} from '../mock/mock_destinations';

import 'flatpickr/dist/flatpickr.min.css';


const createEditForm = (state) => (`
<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${state.type.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${TRIP_TYPES.map((type) => enumerateTypesTrip(type, state)).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${state.id}">
                      ${state.type}
                    </label>
                    <select class="event__input  event__input--destination" id="event-destination-${state.id}" name="event-destination">
                    ${mockDestinations.map((destination) => `<option value="${destination.name}">${destination.name}</option>`)};
                    </select>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${state.dateFrom}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${state.dateTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" oninput="this.value = this.value.replace(/\\D/g, '')" name="event-price" value="${state.basePrice}">
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
                    ${state.pointTypeOffers.map((typeOffer) => (`<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${state.id}-${typeOffer.id}"
                         type="checkbox" name="event-offer-${reformatOfferTitles(typeOffer.title)}" ${state.pointOffers.includes(typeOffer.id) ? 'checked' : ''}>
                        <label class="event__offer-label" for="event-offer-${reformatOfferTitles(typeOffer.title)}-1">
                          <span class="event__offer-title">${typeOffer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${typeOffer.price}</span>
                        </label>
                      </div>`)).join('')}

                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${state.pointDestination.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">

                      ${state.pointDestination.pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="Event photo">`).join('')}
                      </div>
                    </div>
                  </section>
                </section>
              </form>`);

export default class EditFormView extends AbstractStatefulView {
  #handleToPointClick;
  #handleReset;
  #datePickerFrom;
  #datePickerTo;

  constructor(point, destinations, offers, handleToPointClick, handleSubmit, handleReset) {
    super();
    this._state = EditFormView.parseFormViewToState(point, destinations, offers);

    this.#handleToPointClick = handleToPointClick;
    this.#handleReset = handleReset;
    this.#setInnerHandlers();
  }

  get template() {
    return createEditForm(this._state);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
    this.setFormSubmitHandler(EditFormView.parseStateToFormView);
    this.element.addEventListener('reset', this.#handleReset);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#submitHandler);
    this.element.querySelector('.event__type-list').addEventListener('click', this.#changeTripType);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#showNewDescriptionAndPhotos);
    this.element.querySelector('#event-start-time-1').addEventListener('click', this.#setDatePickerDateFrom);
    this.element.querySelector('#event-end-time-1').addEventListener('click', this.#setDatePickerDateTo);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleToPointClick();
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#submitHandler);
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditFormView.parseStateToFormView(this._state));
  };

  #changeTripType = (evt) => {
    if (evt.target.tagName === 'LABEL') {
      this.updateElement({
        type: evt.target.innerHTML, pointOffers: []
      });
    }
  };

  #showNewDescriptionAndPhotos = (evt) => {
    evt.preventDefault();

    this.updateElement({
      pointTypeOffers: this._state.offers.find((offer) => offer.type === this._state.type).offers,
      pointOffers: this._state.offers.filter((offer) => this._state.offers.includes(offer.id)),
      pointDestination: {
        name: evt.target.value
      }
    });
  };

  #setDatePickerDateFrom = () => {
    this.#datePickerFrom = flatpickr(this.element.querySelector('.event__input--time[name=event-end-time]'), {
      enableTime: true,
      dateFormat: 'd/m/y H:s',
      defaultDate: this._state.dateFrom,
      maxDate: this._state.dateTo, // eslint-disable-next-line camelcase
      time_24hr: true,
      onChange: this.#dateChangeHandler,
    });
  };

  #setDatePickerDateTo = () => {
    this.#datePickerTo = flatpickr(this.element.querySelector('.event__input--time[name=event-start-time]'), {
      enableTime: true,
      dateFormat: 'd/m/y H:s',
      defaultDate: this._state.dateTo,
      minDate: this._state.dateFrom, // eslint-disable-next-line camelcase
      time_24hr: true,
      onChange: this.#dateChangeHandler,
    });
  };

  removeElement(element) {
    super.removeElement();

    if (element) {
      element.destroy();
      element = null;
    }
  }

  #dateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
  };

  _restoreHandlers() {
    this.#setInnerHandlers();
    this.element.querySelector('#event-start-time-1').addEventListener('click', this.#setDatePickerDateFrom);
    this.element.querySelector('#event-end-time-1').addEventListener('click', this.#setDatePickerDateTo);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  static parseFormViewToState = (point, destinations, offers) => ({
    ...point,
    pointTypeOffers: offers.find((offer) => offer.type === point.type).offers,
    pointOffers: offers.filter((offer) => point.offers.includes(offer.id)),
    pointDestination: destinations.find((destination) => destination.id === point.destination),
    dateFrom: humanizeDate(point.dateFrom, 'DD/MM/YY HH:mm'),
    dateTo: humanizeDate(point.dateTo, 'DD/MM/YY HH:mm')
  });

  static parseStateToFormView = (state) => ({...state});
}

