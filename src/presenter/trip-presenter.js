import SortView from '../view/sort-view';
import PointsList from '../view/points-list';
import MessageZeroPoints from '../view/empty-points-list-view';
import {render, RenderPosition} from '../framework/render';
import PointPresenter from './point-presenter';
import {updatePoint, sortPriceUp, sortDateUp} from '../utils/util';
import {SortFields, UpdateTypes, UserActions} from '../utils/const';

class TripPresenter {
  #pointsModel;
  #pointsList = new PointsList();
  #pointListContainer;
  #destinations;
  #offers;
  #pointPresenter = new Map();
  #currentSortType = SortFields.DAY;
  #sortComponent = new SortView();

  constructor(pointListContainer, pointsModel) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortFields.TIME:
        return [...this.#pointsModel.points].sort(sortDateUp);
      case SortFields.PRICE:
        return [...this.#pointsModel.points].sort(sortPriceUp);
      default:
        return this.#pointsModel.points;
    }
  }

  init() {
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderBoardPoints();

    this.#sortComponent.setSortTypeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    render(this.#pointsList, this.#pointListContainer);
  }

  #renderPoint = (point, offers, destinations) => {
    const pointPresenter = new PointPresenter(this.#pointsList.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint, offers, destinations) => {
    this.#pointsList = updatePoint(this.#pointsModel.points, updatedPoint);
    this.#pointsModel.points = updatedPoint(this.#pointsModel.points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, offers, destinations);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#clearPointsList();
    this.#renderBoardPoints();
  };

  #renderBoardPoints = () => {
    if (this.#pointsModel.points.length === 0) {
      render(new MessageZeroPoints(), this.#pointListContainer);
      return;
    }

    for (const point of this.#pointsModel.points) {
      this.#renderPoint(point, this.#destinations, this.#offers);
    }
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView(presenter));
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateTypes.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateTypes.MINOR:
        break;
      case UpdateTypes.MAJOR:
        this.#renderBoardPoints();
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserActions.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserActions.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserActions.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };
}

export default TripPresenter;
