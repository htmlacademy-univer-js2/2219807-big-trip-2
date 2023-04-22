import SortView from '../view/sort';
import PointsList from '../view/points-list';
import MessageZeroPoints from '../view/empty-points-list';
import {render, RenderPosition} from '../framework/render';
import PointPresenter from './point-presenter';

class TripPresenter {
  #boardPoints;
  #pointsModel;
  #pointsList = new PointsList();
  #pointListContainer;
  #destinations;
  #offers;

  constructor(pointListContainer, pointsModel) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderBoardPoints();

    render(new SortView(), this.#pointListContainer, RenderPosition.AFTERBEGIN);
    render(this.#pointsList, this.#pointListContainer);
  }

  #renderPoint = (point, offers, destinations) => {
    const pointPresenter = new PointPresenter(this.#pointsList.element);
    pointPresenter.init(point, offers, destinations);
  };

  #renderBoardPoints = () => {
    if (this.#boardPoints.length === 0) {
      render(new MessageZeroPoints(), this.#pointListContainer);
      return;
    }

    for (const point of this.#boardPoints) {
      this.#renderPoint(point, this.#destinations, this.#offers);
    }
  };
}

export default TripPresenter;
