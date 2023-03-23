import {points} from '../mock/point';
import {destinations} from '../mock/destinations';

export default class PointModel {
  constructor() {
    this.points = points;
    this.destinations = destinations;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }
}
