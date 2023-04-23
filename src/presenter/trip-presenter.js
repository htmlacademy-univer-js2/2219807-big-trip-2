import SortView from '../view/sort-view';
import PointsList from '../view/points-list';
import MessageZeroPoints from '../view/empty-points-list-view';
import {render, RenderPosition} from '../framework/render';
import PointPresenter from './point-presenter';
import {updatePoint, sortPointDown, sortPointUp} from '../utils/util';
import {SORT_FIELDS} from '../utils/const';

class TripPresenter {
  #boardPoints;
  #pointsModel;
  #pointsList = new PointsList();
  #pointListContainer;
  #destinations;
  #offers;
  #pointPresenter = new Map();
  #currentSortType = SORT_FIELDS.DAY;
  #sourcedBoardPoints = [];

  constructor(pointListContainer, pointsModel) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#sourcedBoardPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderBoardPoints();

    render(new SortView(this.#handleSortTypeChange), this.#pointListContainer, RenderPosition.AFTERBEGIN);
    render(this.#pointsList, this.#pointListContainer);
  }

  #renderPoint = (point, offers, destinations) => {
    const pointPresenter = new PointPresenter(this.#pointsList.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint, offers, destinations) => {
    this.#pointsList = updatePoint(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updatedPoint(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, offers, destinations);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType){
      return;
    }

    this.#sortPoints();
    this.#clearPointsList();
    this.#renderBoardPoints();
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SORT_FIELDS.DAY:
        this.#boardPoints.sort(sortPointDown);
        break;
      case SORT_FIELDS.TIME:
        this.#boardPoints.sort(sortPointUp);
        break;
      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  }

  #renderBoardPoints = () => {
    if (this.#boardPoints.length === 0) {
      render(new MessageZeroPoints(), this.#pointListContainer);
      return;
    }

    for (const point of this.#boardPoints) {
      this.#renderPoint(point, this.#destinations, this.#offers);
    }
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView(presenter));
  };
}

export default TripPresenter;
