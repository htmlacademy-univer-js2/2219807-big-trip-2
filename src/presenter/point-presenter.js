import PointsView from '../view/points-view';
import EditFormView from '../view/point-edit-form';
import {remove, render, replace} from '../framework/render';


export default class PointPresenter {
  #pointsListComponent;
  #point;
  #pointComponent;
  #pointEditComponent;

  constructor(pointsListContainer) {
    this.#pointsListComponent = pointsListContainer;
  }

  init = (point, destinations, offers) => {
    this.#point = point;

    const recordedPointState = this.#pointComponent;
    const recordedEditPointState = this.#pointEditComponent;

    this.#pointComponent = new PointsView(point, destinations, offers);
    this.#pointEditComponent = new EditFormView(point, destinations, offers);

    this.#pointComponent.setClickHandler(this.#handleToEditClick);
    this.#pointEditComponent.setHandlers(this.#handleToDefaultPoint);

    if (recordedPointState === undefined || recordedEditPointState === null) {
      render(this.#pointComponent, this.#pointsListComponent);
      return;
    }

    if (this.#pointsListComponent.contains(recordedPointState.element)) {
      replace(this.#pointComponent, recordedEditPointState);
    }

    if (this.#pointEditComponent.contains(recordedEditPointState.element)) {
      replace(this.#pointEditComponent, recordedEditPointState);
    }

    remove(recordedPointState);
    remove(recordedEditPointState);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };


  #turnIntoEdit = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyup);
  };

  #turnIntoPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyup);
  };

  #handleToEditClick = () => {
    this.#turnIntoEdit();
  };

  #handleToDefaultPoint = () => {
    this.#turnIntoPoint();
  }

  #onEscKeyup = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#turnIntoPoint();
    }
  };
}

