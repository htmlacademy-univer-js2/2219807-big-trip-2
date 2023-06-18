import PointsView from '../view/points-view';
import EditFormView from '../view/point-edit-form';
import {remove, render, replace} from '../framework/render';
import {UpdateTypes, UserActions, ModesEditingPoint} from '../utils/const';


export default class PointPresenter {
  #pointsListContainer;

  #pointComponent = null;
  #pointEditComponent = null;

  #point;

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
    const previousPointComponent = this.#pointComponent;
    const previousEditPointComponent = this.#pointEditComponent;

    this.#pointComponent = new PointsView(point, destinations, offers);
    this.#pointEditComponent = new EditFormView(point, destinations, offers);

    this.#pointComponent.setEditModeClickHandler(this.#turnIntoEdit);
    this.#pointComponent.setFavoritePointClickHandler(this.#handleFavoritePoint);

    this.#pointEditComponent.setFormSubmitHandler(this.#handleSubmit);
    this.#pointEditComponent.setResetSubmitHandler(this.#handleReset);
    this.#pointEditComponent.setFormCloseHandler(this.#handleClose);

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

  #handleClose = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#turnIntoPoint();
    document.removeEventListener('keydown', this.#onEscKeyup);
  };

  #handleSubmit = (update) => {
    this.#handlePointChange(
      UserActions.UPDATE_POINT,
      UpdateTypes.MINOR,
      update
    );
    document.removeEventListener('keydown', this.#onEscKeyup);
    this.#turnIntoPoint();
  };

  #handleReset = () => {
    this.#handlePointChange(
      UserActions.UPDATE_POINT,
      UpdateTypes.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #turnIntoEdit = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyup);
    this.#changeMode();
    this.#isEditing = ModesEditingPoint.EDITING;
  };

  #handleFavoritePoint = () => {
    this.#handlePointChange(
      UserActions.UPDATE_POINT,
      UpdateTypes.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
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
