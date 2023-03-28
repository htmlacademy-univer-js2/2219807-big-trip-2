import {render, RenderPosition} from '../render';
import PointsView from '../view/points-view';
import SortView from '../view/sort';
import PointNewForm from '../view/point-new-form';
import EditFormView from '../view/point-edit-form';
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
    this.destination = this.pointModel.getDestinations();
    this.boardPoints = [...this.pointModel.getPoints()];
    const offersByType = this.pointModel.getOffersByType();

    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new PointNewForm(), this.component.getElement(), RenderPosition.BEFOREEND);
    render(new EditFormView(this.boardPoints[1], destinations, offersByType), this.component.getElement(), RenderPosition.BEFOREEND);

    for (const point of this.boardPoints) {
      render(new PointsView(point, destinations, offersByType), this.component.getElement());
    }

    render(new Filter(), filterContainer, RenderPosition.BEFOREEND);
  }
}

export default Trip;
