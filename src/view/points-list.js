import AbstractView from '../framework/view/abstract-view';

const createPointsList = () => (
  `<ul class="trip-events__list">
    </ul>`
);

export default class PointsList extends AbstractView {
  #element;

  get template() {
    return createPointsList();
  }
}
