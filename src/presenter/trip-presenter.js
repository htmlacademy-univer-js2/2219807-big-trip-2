import SortView from '../view/sort';
import PointsList from '../view/points-list';
import MessageZeroPoints from '../view/empty-points-list';
import {render} from '../framework/render';
import PointPresenter from './point-presenter';

class TripPresenter {
  #boardPoints;
  #pointsModel;
  #pointsList;
  #container;
  #destinations;
  #offers;

  constructor(pointContainer) {
    this.#pointsList = new PointsList();
    this.#container = pointContainer;
  }

  init(pointsModel) {
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderBoardPoints();

    render(new SortView(), this.#container);
    render(this.#pointsList, this.#container);
  }

  #renderPoint = (point, offers, destinations) => {
    const pointPresenter = new PointPresenter(this.#pointsList.element);
    pointPresenter.init(point, offers, destinations);
  };

  #renderBoardPoints = () => {
    if (this.#boardPoints.length === 0) {
      render(new MessageZeroPoints(), this.#container);
      return;
    }

    for (const point of this.#boardPoints) {
      this.#renderPoint(point, this.#destinations, this.#offers);
    }
  };
}

export default TripPresenter;
