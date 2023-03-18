import {createElement} from '../render';

const createPointsList = () => (
  `<ul class="trip-events__list">
    </ul>`
);

class PointsList {
  getTemplate() {
    return createPointsList();
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

export default PointsList;
