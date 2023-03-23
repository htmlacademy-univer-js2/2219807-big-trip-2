import {render, RenderPosition} from '../render';
import PointsView from '../view/points-view';
import SortView from '../view/sort';
import CreationForm from '../view/creation-form';
import EditFormView from '../view/edit-form';
import PointsList from '../view/points-list';
import Filter from '../view/filters';
import PointModel from '../model/point-model';
import {destinations} from '../mock/destinations';


class Trip {
  constructor({container}) {
    this.component = new PointsList();
    this.container = container;
    this.pointModel = new PointModel();
  }

  init(filterContainer, pointModel) {
    this.pointModel = pointModel;
    this.destinations = this.pointModel.getDestinations();
    this.boardPoints = [...this.pointModel.getPoints()];

    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new CreationForm(), this.component.getElement(), RenderPosition.BEFOREEND);
    render(new EditFormView(this.boardPoints[0], destinations), this.component.getElement(), RenderPosition.BEFOREEND);

    for (const point of this.boardPoints) {
      render(new PointsView(point, destinations), this.component.getElement());
    }

    render(new Filter(), filterContainer, RenderPosition.BEFOREEND);
  }
}

export default Trip;
