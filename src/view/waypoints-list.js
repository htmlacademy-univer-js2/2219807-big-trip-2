import {createElement} from '../render';

const createWaypointsList = () => (
  `<ul class="trip-events__list">
    </ul>`
);

class WaypointsList {
  getTemplate() {
    return createWaypointsList();
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

export default WaypointsList;
