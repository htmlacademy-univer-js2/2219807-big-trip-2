import {generatePoints} from '../mock/point';

export default class PointModel {
  constructor() {
    this.points = Array.from({length: 10}, generatePoints);
  }

  getPoints() {
    return this.points;
  }
}
