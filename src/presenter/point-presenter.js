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

  #handlePointChange;

  #changeMode;
  #isEditing = false; // Можно было бы реализовать и через объект и рассматривать несколько состояний,
  // но я пока что решил, что не стоит, в будущем можно будет переделать

  constructor(pointsListContainer, changeDataPoint, changeMode) {
    this.#pointsListContainer = pointsListContainer;
    this.#handlePointChange = changeDataPoint;
    this.#changeMode = changeMode;
  }

  init = (point, destinations, offers) => {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const previousPointComponent = this.#pointComponent;
    const previousEditPointComponent = this.#pointEditComponent;

    this.#pointComponent = new PointsView(
      this.#point,
      this.#destinations,
      this.#offers,
      this.#handleToEditClick,
      this.#handleFavoritePoint
    );
    this.#pointEditComponent = new EditFormView(
      this.#point,
      this.#destinations,
      this.#offers,
      this.#handleToDefaultPoint,
      this.#handleToDefaultPoint, // submit
      this.#handleToDefaultPoint // reset
    ); // так как пока что у кнопок reset и submit одинаковое, временно сделаем одинаковое поведение у них

    if (previousPointComponent === null || previousEditPointComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#isEditing === false) {
      replace(this.#pointComponent, previousPointComponent);
    } else {
      replace(this.#pointEditComponent, previousEditPointComponent);
    }

    remove(previousPointComponent);
    remove(previousEditPointComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#isEditing) {
      this.#turnIntoPoint();
    }
  };

  #handleToEditClick = () => {
    this.#turnIntoEdit();
  };

  #turnIntoEdit = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyup);
    this.#changeMode();
    this.#isEditing = true;
  };

  #handleFavoritePoint = () => {
    this.#handlePointChange(this.#point, this.#destinations, this.#offers, !this.#point.isFavorite);
  };

  #handleToDefaultPoint = () => {
    this.#turnIntoPoint();
  };

  #turnIntoPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyup);
    this.#isEditing = false;
  };

  #onEscKeyup = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#turnIntoPoint();
    }
  };
}
