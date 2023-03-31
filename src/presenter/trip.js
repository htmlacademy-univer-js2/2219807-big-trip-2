import {render, RenderPosition} from '../render';
import PointsView from '../view/points-view';
import SortView from '../view/sort';
import PointNewForm from '../view/point-new-form';
import EditFormView from '../view/point-edit-form';
import PointsList from '../view/points-list';
import FiltersView from '../view/filters';
import PointModel from '../model/point-model';
import {destinations} from '../mock/destinations';
import {offers} from '../mock/offer';


class Trip {
  constructor({container}) {
    this.component = new PointsList();
    this.container = container;
    this.pointModel = new PointModel();
  }

  init(filterContainer, pointModel) {
    this.pointModel = pointModel;
    this.destinations = this.pointModel.destinations;
    this.boardPoints = [...this.pointModel.points];
    this.offers = offers;

    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new PointNewForm(), this.component.getElement(), RenderPosition.BEFOREEND);
    render(new EditFormView(this.boardPoints[1], destinations, offers), this.component.getElement(), RenderPosition.BEFOREEND);

    for (const point of this.boardPoints) {
      render(new PointsView(point, destinations, offers), this.component.getElement());
    }

    render(new FiltersView(), filterContainer, RenderPosition.BEFOREEND);
  }
}

export default Trip;
