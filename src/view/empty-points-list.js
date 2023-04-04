import {createElement} from '../render';

const createMessageZeroPoints = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class MessageZeroPoints {
  #element;
  get template() {
    return createMessageZeroPoints();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}


