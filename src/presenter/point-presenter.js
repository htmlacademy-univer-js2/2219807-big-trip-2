import PointsView from '../view/points-view';
import EditFormView from '../view/point-edit-form';
import {render, replace} from '../framework/render';


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

    this.#pointComponent = new PointsView(point, destinations, offers);
    this.#pointEditComponent = new EditFormView(point, destinations, offers);

    this.#pointComponent.setClickHandler(this.#handleToEditClick);

    this.#pointEditComponent.setClickHandler(this.#handleToDefaultPoint);
    this.#pointEditComponent.setResetHandler(this.#handleToDefaultPoint);
    this.#pointEditComponent.setSubmitHandler(this.#handleToDefaultPoint);

    this.#pointComponent.setClickHandler(this.#handleToEditClick);
    render(this.#pointComponent, this.#pointsListComponent);
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

