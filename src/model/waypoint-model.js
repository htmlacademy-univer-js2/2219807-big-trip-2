import {generateWaypoint} from '../mock/waypoint';

export default class WaypointModel {
  waypoints = Array.from({length: 10}, generateWaypoint);

  get waypoints() {
    return this.waypoints;
  }
}
