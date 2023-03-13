import {render, RenderPosition} from '../render';
import WaypointsView from '../view/waypoint';
import SortView from '../view/sort';
import CreationForm from '../view/creation-form';
import EditFormView from '../view/edit-form';
import WaypointsList from '../view/waypoints-list';


class Trip {
  constructor({container}) {
    this.component = new WaypointsList();
    this.container = container;
  }

  init() {
    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new CreationForm(), this.component.getElement(), RenderPosition.BEFOREEND);
    render(new EditFormView(), this.component.getElement(), RenderPosition.BEFOREEND);
    for (let i = 0; i < 10; i++){
      render(new WaypointsView(), this.component.getElement(), RenderPosition.BEFOREEND);
    }
  }
}

export default Trip;
