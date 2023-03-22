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

  init(filterContainer, pointModel) {
    this.pointModel = pointModel;
    this.boardPoints = [...this.pointModel.getPoints()];

    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new CreationForm(), this.component.getElement(), RenderPosition.BEFOREEND);
    render(new EditFormView(this.boardPoints[0]), this.component.getElement(), RenderPosition.BEFOREEND);

    for (const point of this.boardPoints) {
      render(new PointsView(point), this.component.getElement());
    }

    render(new Filter(), filterContainer, RenderPosition.BEFOREEND);
  }
}

export default Trip;
