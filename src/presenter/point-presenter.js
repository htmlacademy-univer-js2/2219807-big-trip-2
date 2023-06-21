import PointsView from '../view/points-view';
import {remove, render, replace} from '../framework/render';
import {UpdateTypes, UserActions, ModesEditingPoint} from '../utils/const';
import PointEditForm from '../view/point-edit-form';


export default class PointPresenter {
  #pointsListComponent;
  #point;
  #destinations;
  #offers;
  #pointComponent = null;
  #pointEditComponent = null;

  #dataChange;
  #modeChange;
  #mode = ModesEditingPoint.DEFAULT;

  constructor({pointListContainer, dataChange, modeChange, destinations, offers}) {
    this.#pointsListComponent = pointListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#dataChange = dataChange;
    this.#modeChange = modeChange;
  }

  init = (point) => {
    this.#point = point;

    const previousPointComponent = this.#pointComponent;
    const previousPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointsView({
      point: point,
      destinations: this.#destinations,
      offers: this.#offers,
      editClick: this.#handleEditClick,
      favoriteClick: this.#handleFavoriteClick
    });

    this.#pointEditComponent = new PointEditForm({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      saveClick: this.#handleSaveForm,
      closeClick: this.#handleCloseForm,
      deleteClick: this.#handleDeletePoint
    });

    if (previousPointComponent === null || previousPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsListComponent);
      return;
    }

    remove(previousPointComponent);
    remove(previousPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== ModesEditingPoint.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#modeChange();
    this.#mode = ModesEditingPoint.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = ModesEditingPoint.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  setSaving = () => {
    if (this.#mode === ModesEditingPoint.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === ModesEditingPoint.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    const resetFromState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFromState);
  };

  #handleDeletePoint = (point) => this.#dataChange(UserActions.DELETE_POINT, UpdateTypes.MAJOR, point);

  #handleEditClick = () => this.#replacePointToForm();

  #handleFavoriteClick = () => {
    this.#dataChange(
      UserActions.UPDATE_POINT,
      UpdateTypes.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleSaveForm = (update) => {
    this.#dataChange(UserActions.UPDATE_POINT, UpdateTypes.MAJOR, update);
    this.#replaceFormToPoint();
  };

  #handleCloseForm = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };
}
