import {generatePoints} from '../mock/point';
import {mockDestinations} from '../mock/mock_destinations';
import {offers} from '../mock/offer';
import Observable from '../framework/observable';

export default class PointModel extends Observable {
  #points;
  #destinations;
  #offers;

  init() {
    this.#points = Array.from({length: 3}, generatePoints);
    this.#destinations = mockDestinations;
    this.#offers = offers;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  updatePoint = (updateType, update) => {
    this.#points = [this.#points.map((item) => item.id === update.id ? update : item)];
    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [update, ...this.#points];
    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    this.#points.filter((point) => point !== update);
    this._notify(updateType, update);
  };
}
