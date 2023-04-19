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

  init = (point) => {
    this.#point = point;

    this.#pointComponent = new PointsView(point);
    this.#pointEditComponent = new EditFormView(point);

    this.#pointComponent.setClickHandler(this.#handleEditClick);
    render(this.#pointComponent, this.#pointsListComponent.element);
  };


  #turnIntoEdit = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyup);
  };

  #turnIntoPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyup);
  };

  #handleEditClick = () => {
    this.#turnIntoEdit();
  };

  #onEscKeyup = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#turnIntoPoint();
    }
  };
}

