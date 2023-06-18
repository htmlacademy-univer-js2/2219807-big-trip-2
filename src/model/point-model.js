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
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexciting point');
    }

    this.#points = [
      ...this.points.slice(0, index),
      update,
      ...this.points.slice(index + 1)
    ];
    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [update, ...this.#points];
    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexciting point');
    }

    this.#points = [
      ...this.points.slice(0, index),
      ...this.points.slice(index + 1)
    ];

    this._notify(updateType, update);
  };
}
