import {generatePoint} from '../mock/point';

export default class PointModel {
  points = Array.from({length: 10}, generatePoint);

  get waypoints() {
    return this.points;
  }
}
