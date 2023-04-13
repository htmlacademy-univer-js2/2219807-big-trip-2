import {createElement} from '../render';

const createPointsList = () => (
  `<ul class="trip-events__list">
    </ul>`
);

export default class PointsList {
  #element;
  get template() {
    return createPointsList();
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
};
