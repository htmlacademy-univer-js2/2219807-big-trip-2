import SortView from '../view/sort';
import PointsList from '../view/points-list';
import FiltersView from '../view/filters';
import PointModel from '../model/point-model';
import MessageZeroPoints from '../view/empty-points-list';
import {render} from '../framework/render';
import {generateFilter} from '../mock/filter';
import PointPresenter from './point-presenter';

class TripPresenter {
  #boardPoints;
  #pointModel;
  #filterContainer;
  #pointsListComponent;
  #container;

  constructor({container}) {
    this.#pointsListComponent = new PointsList();
    this.#container = container;
    this.#pointModel = new PointModel();
  }

  init(filterContainer, pointModel) {
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;
    const filters = generateFilter(pointModel.points);
    this.#filterContainer = filterContainer;
    this.#pointModel = pointModel;
    this.#boardPoints = [...this.#pointModel.points];

    if (this.#boardPoints.length === 0) {
      render(new MessageZeroPoints(), this.#container);
      return;
    }

    render(new SortView(), this.#container);
    render(this.#pointsListComponent, this.#container);

    for (const point of this.#boardPoints) {
      this.#renderPoint(point, destinations, offers);
    }

    render(new FiltersView(filters), this.#filterContainer);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element);
    pointPresenter.init(point);
  };
}

export default TripPresenter;
