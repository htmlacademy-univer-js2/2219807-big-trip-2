import PointsView from '../view/points-view';
import EditFormView from '../view/point-edit-form';
import {remove, render, replace} from '../framework/render';


export default class PointPresenter {
  #pointsListContainer;

  #pointComponent = null;
  #pointEditComponent = null;

  #point;
  #destinations;
  #offers;

  constructor(pointsListContainer) {
    this.#pointsListContainer = pointsListContainer;
  }

  init = (point, destinations, offers) => {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const previousPointComponent = this.#pointComponent;
    const previousEditPointComponent = this.#pointEditComponent;

    this.#pointComponent = new PointsView(this.#point, this.#destinations, this.#offers, this.#handleToEditClick);
    this.#pointEditComponent = new EditFormView(this.#point, this.#destinations, this.#offers, this.#handleToDefaultPoint);

    this.#pointComponent.setClickHandler(this.#turnIntoEdit);
    this.#pointEditComponent.setHandlers(this.#turnIntoPoint);

    if (previousPointComponent === null || previousEditPointComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#pointsListContainer.contains(previousPointComponent.element)) {
      replace(this.#pointComponent, previousPointComponent);
    }

    if (this.#pointsListContainer.contains(previousEditPointComponent.element)) {
      replace(this.#pointEditComponent, previousEditPointComponent);
    }

    remove(previousPointComponent);
    remove(previousEditPointComponent);
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
  };

  #onEscKeyup = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#turnIntoPoint();
    }
  };
}

