import {
  enumerateTypesTrip,
  getRandomIntegerInterval,
  humanizeDate,
  reformatOfferTitles
} from '../utils/util';
import {TRIP_TYPES} from '../utils/const';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {getRandomDescription} from '../mock/destinations';


const createEditForm = (state) => (`
<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${state.point.type}.png" alt="Event type icon">
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
                    <label class="event__label  event__type-output" for="event-destination-${state.point.id}">
                      ${state.point.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${state.point.id}" type="text" name="event-destination" value=${state.point.pointDestination.name} list="destination-list-${state.point.id}">
                    <datalist id="destination-list-${state.point.id}">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${state.point.dateFrom}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${state.point.dateTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${state.point.basePrice}">
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
                    ${state.point.pointTypeOffers.map((typeOffer) => (
    `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${reformatOfferTitles(typeOffer.title)}-1"
                         type="checkbox" name="event-offer-${reformatOfferTitles(typeOffer.title)}" ${state.point.pointOffers.includes(typeOffer.id) ? 'checked' : ''}>
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
                    <p class="event__destination-description">${state.point.pointDestination.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">

                      ${state.point.pointDestination.pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="Event photo">`).join('')}
                      </div>
                    </div>
                  </section>
                </section>
              </form>`
);

export default class EditFormView extends AbstractStatefulView {
  #handleToPointClick;
  #handleReset;

  constructor(point, destinations, offers, handleToPointClick, handleSubmit, handleReset) {
    super();
    this._state = EditFormView.parseFormViewToState(point, destinations, offers);

    this.#handleToPointClick = handleToPointClick;
    this.#handleReset = handleReset;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
    this.setFormSubmitHandler(EditFormView.parseStateToFormView);
    this.element.addEventListener('reset', this.#handleReset);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#changeTripType);

    if (this.element.querySelector('#event-destination-1')) {
      this.element.querySelector('#event-destination-1').addEventListener('change', this.#showNewDescriptionAndPhotos);
    }
  }

  get template() {
    return createEditForm(this._state);
  }

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
    evt.preventDefault();

    this._setState({
      type: evt.target.value,
      pointOffers: this._state.offers.filter((offer) => this._state.point.offers.includes(offer.id)),
      isChecked: !this._state.offers.isChecked
    });
  };

  #showNewDescriptionAndPhotos = (evt) => {
    evt.preventDefault();

    this.updateElement({
      destinations: {
        ...this._state.destinations,
        description: getRandomDescription(),
        name: evt.target.value,
        pictures: {
          src: `https://picsum.photos/248/152?r=${getRandomIntegerInterval(1, 1000)}`,
          description: getRandomDescription()
        }
      }
    });
  };

  _restoreHandlers() {
    return undefined;
  }

  static parseFormViewToState = (point, destinations, offers) => ({
    point: {
      ...point,
      dateFrom: humanizeDate(point.dateFrom, 'DD/MM/YY HH:mm'),
      dateTo: humanizeDate(point.dateTo, 'DD/MM/YY HH:mm'),
      pointTypeOffers: offers.find((offer) => offer.type === point.type).offers,
      pointOffers: offers.filter((offer) => point.offers.includes(offer.id)),
      pointDestination: destinations.find((destination) => destination.id === point.destination),
      isChecked: false
    },
    destinations: destinations,
    offers: offers
  });

  static parseStateToFormView = (state) => {
    const point = {...state};

    delete point.pointTypeOffers;
    delete point.pointOffers;
    delete point.pointDestination;

    return {
      ...state,
      destination: state.destinations.id,
      offers: state.offers.filter((offer) => offer === state.point.id)
    };
  };
}

