import {render, RenderPosition} from '../render';
import WaypointsView from '../view/waypoint';
import SortView from '../view/sort';
import CreationForm from '../view/creation-form';
import EditFormView from '../view/edit-form';
import WaypointsList from '../view/waypoints-list';
import Filter from '../view/filters';


class Trip {
  constructor({container}) {
    this.component = new WaypointsList();
    this.container = container;
  }

  init(filterContainer, waypointsModel) {
    this.waypointsModel = waypointsModel;
    this.boardWaypoints = [...this.waypointsModel.waypoints];

    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new CreationForm(), this.component.getElement(), RenderPosition.BEFOREEND);
    render(new EditFormView(), this.component.getElement(), RenderPosition.BEFOREEND);
    for (let i = 0; i < this.boardWaypoints.length; i++) {
      render(new WaypointsView(), this.component.getElement(), RenderPosition.BEFOREEND);
    }
    render(new Filter(), filterContainer, RenderPosition.BEFOREEND);
  }
}

export default Trip;
