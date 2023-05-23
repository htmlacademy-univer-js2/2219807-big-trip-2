import {generatePoints} from '../mock/point';
import {destinations} from '../mock/destinations';
import {offers} from '../mock/offer';
import Observable from '../framework/observable';

export default class PointModel extends Observable {
  #points;
  #destinations;
  #offers
  init() {
    this.#points = Array.from({length: 3}, generatePoints);
    this.#destinations = destinations;
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
}
