import {generatePoints} from '../mock/point';
import {destinations} from '../mock/destinations';
import {offers} from '../mock/offer';

export default class PointModel {
  #points;
  #destinations;
  #offers
  constructor() {
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
