import {generatePoints} from '../mock/point';
import {destinations} from '../mock/destinations';
import {offers} from '../mock/offer';

export default class PointModel {
  constructor() {
    this.points = Array.from({length: 3}, generatePoints);
    this.destinations = destinations;
    this.offers = offers;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffersByType() {
    return this.offers;
  }
}
