import {RenderPosition, render, remove} from '../framework/render.js';
import {UserActions, SortFields, UpdateTypes, FilterTypes, filterOut, sorting} from '../utils/const';
import SortView from '../view/sort-view.js';
import PointsList from '../view/points-list';
import EmptyListView from '../view/empty-points-list-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import LoadingView from '../view/loading-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import TripInfoView from '../view/trip-info-view.js';
import ErrorView from '../view/error-view.js';


export default class TripPresenter {

  #tripContainer = null;
  #menuContainer = null;

  #tripListComponent = new PointsList();
  #loadingComponent = new LoadingView();
  #emptyListComponent = new EmptyListView();
  #sortComponent = null;
  #newPointButtonComponent = null;
  #infoComponent = null;
  #errorComponent = new ErrorView();

  #pointsModel = null;
  #filterModel = null;

  #currentSortType = SortFields.DAY;
  #isLoading = true;

  #pointPresenter = new Map();
  #pointNewPresenter = null;

  constructor({menuContainer, tripContainer, pointsModel, filterModel}) {
    this.#tripContainer = tripContainer;
    this.#menuContainer = menuContainer;

    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => this.#renderTripList();

  get points() {
    const filterType = this.#filterModel.filter;
    const filteredPoints = filterOut[filterType](this.#pointsModel.points);
    return sorting[this.#currentSortType](filteredPoints);
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserActions.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserActions.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserActions.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateTypes.MINOR:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateTypes.MAJOR:
        this.#clearTripList();
        this.#renderTripList();
        break;
      case UpdateTypes.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        if (this.#pointsModel.errored) {
          this.#renderNewPointButton(true);
          this.#renderError();
        } else {
          this.#createNewPointPresenter();
          this.#renderNewPointButton(false);
          this.#renderTripList();
        }
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripList();
    this.#renderTripList();
  };

  #handleModeChange = () => this.#pointPresenter.forEach((presenter) => presenter.resetView());

  #handleNewPointButtonClick = () => {
    this.createPoint();
    this.#newPointButtonComponent.element.disabled = true;
  };

  #handleNewPointClose = () => {
    if (this.points.length === 0) {
      this.#renderFirstMessage();
    }
    this.#newPointButtonComponent.element.disabled = false;
  };

  createPoint = () => {
    this.#currentSortType = SortFields.DAY;
    this.#filterModel.setFilter(UpdateTypes.MAJOR, FilterTypes.EVERYTHING);
    remove(this.#emptyListComponent);
    this.#pointNewPresenter.init();
  };

  #createNewPointPresenter = () => {
    this.#pointNewPresenter = new NewPointPresenter({
      newPointContainer: this.#tripListComponent.element,
      pointsModel: this.#pointsModel,
      changeData: this.#handleViewAction,
      destroyCallback: this.#handleNewPointClose,
    });
  };

  #renderFirstMessage = () => render(this.#emptyListComponent, this.#tripContainer);

  #renderNewPointButton = (isDisabled) => {
    if (this.#newPointButtonComponent === null) {
      this.#newPointButtonComponent = new NewPointButtonView({
        buttonClick: this.#handleNewPointButtonClick,
        isDisabled: isDisabled
      });
    }
    render(this.#newPointButtonComponent, this.#menuContainer, RenderPosition.BEFOREEND);
  };

  #renderSort = () => {
    if (this.#sortComponent === null) {
      this.#sortComponent = new SortView(this.#currentSortType, this.#handleSortTypeChange);
    }

    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderLoading = () => render(this.#loadingComponent, this.#tripContainer);

  #renderError = () => render(this.#errorComponent, this.#tripContainer);

  #renderInfo = () => {
    if (this.#infoComponent === null) {
      this.#infoComponent = new TripInfoView(this.#pointsModel.points, this.destinations, this.offers);
    }
    render(this.#infoComponent, this.#menuContainer, RenderPosition.AFTERBEGIN);
  };

  #renderTripList = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    render(this.#tripListComponent, this.#tripContainer);

    if (this.points.length === 0) {
      remove(this.#sortComponent);
      this.#renderFirstMessage();
    } else {
      remove(this.#emptyListComponent);
      this.#renderSort();
      this.#renderInfo();
      this.#renderPoints();
    }
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#tripListComponent.element,
      dataChange: this.#handleViewAction,
      modeChange: this.#handleModeChange,
      destinations: this.destinations,
      offers: this.offers
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => this.points.forEach((point) => this.#renderPoint(point));

  #clearTripList = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    this.#clearInfo();
  };

  #clearInfo = () => {
    remove(this.#infoComponent);
    this.#infoComponent = null;
  };
}
