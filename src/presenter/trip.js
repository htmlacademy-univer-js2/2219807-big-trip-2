import {render, RenderPosition} from '../render';
import PointsView from '../view/points-view';
import SortView from '../view/sort';
import CreationForm from '../view/creation-form';
import EditFormView from '../view/edit-form';
import PointsList from '../view/points-list';
import Filter from '../view/filters';


class Trip {
  constructor({container}) {
    this.component = new PointsList();
    this.container = container;
  }

  init(filterContainer, pointsModel) {
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.points];

    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new CreationForm(), this.component.getElement(), RenderPosition.BEFOREEND);
    render(new EditFormView(), this.component.getElement(), RenderPosition.BEFOREEND);
    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointsView(), this.component.getElement(), RenderPosition.BEFOREEND);
    }
    render(new Filter(), filterContainer, RenderPosition.BEFOREEND);
  }
}

export default Trip;
