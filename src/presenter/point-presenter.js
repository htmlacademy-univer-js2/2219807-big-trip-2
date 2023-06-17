import PointsView from '../view/points-view';
import EditFormView from '../view/point-edit-form';
import {remove, render, replace} from '../framework/render';
import {UpdateTypes, UserActions, ModesEditingPoint} from '../utils/const';


export default class PointPresenter {
  #pointsListContainer;

  #pointComponent = null;
  #pointEditComponent = null;

  #point;
  #destinations;
  #offers;

  #handlePointChange;

  #changeMode;
  #isEditing = ModesEditingPoint;

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
      this.#handleSubmit,
      this.#handleReset
    );

    if (previousPointComponent === null || previousEditPointComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#isEditing === ModesEditingPoint.EDITING) {
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
    if (this.#isEditing === ModesEditingPoint.EDITING) {
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
    this.#isEditing = ModesEditingPoint.EDITING;
  };

  #handleSubmit = () => {
    this.#handlePointChange(UserActions.UPDATE_POINT, UpdateTypes.MINOR, this.#point, this.#destinations, this.#offers, !this.#point.isFavorite);
    this.#turnIntoPoint();
  };

  #handleReset = () => {
    this.#handlePointChange(UserActions.UPDATE_POINT, UpdateTypes.MINOR, this.#point, this.#destinations, this.#offers, !this.#point.isFavorite);
  };

  #handleFavoritePoint = () => {
    this.#handlePointChange(UserActions.UPDATE_POINT, UpdateTypes.MINOR, this.#point, this.#destinations, this.#offers, !this.#point.isFavorite);
  };

  #handleToDefaultPoint = () => {
    this.#turnIntoPoint();
  };

  #turnIntoPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyup);
    this.#isEditing = ModesEditingPoint.DEFAULT;
  };

  #onEscKeyup = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#turnIntoPoint();
    }
  };
}
