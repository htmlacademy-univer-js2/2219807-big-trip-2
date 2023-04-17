import PointsView from '../view/points-view';
import SortView from '../view/sort';
import EditFormView from '../view/point-edit-form';
import PointsList from '../view/points-list';
import FiltersView from '../view/filters';
import PointModel from '../model/point-model';
import MessageZeroPoints from '../view/empty-points-list';
import {render, replace} from '../framework/render';
import {generateFilter} from '../mock/filter';

class TripPresenter {
  #boardPoints;
  #pointModel;
  #filterContainer;
  #pointsListComponent;
  #container;

  constructor({container}) {
    this.#pointsListComponent = new PointsList();
    this.#container = container;
    this.#pointModel = new PointModel();
  }

  init(filterContainer, pointModel) {
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;
    const filters = generateFilter(pointModel.points);
    this.#filterContainer = filterContainer;
    this.#pointModel = pointModel;
    this.#boardPoints = [...this.#pointModel.points];

    if (this.#boardPoints.length === 0) {
      render(new MessageZeroPoints(), this.#container);
      return;
    }

    render(new SortView(), this.#container);
    render(this.#pointsListComponent, this.#container);

    for (const point of this.#boardPoints) {
      this.#renderPoint(point, destinations, offers);
    }

    render(new FiltersView(filters), this.#filterContainer);
  }

  #renderPoint = (point, destinations, offers) => {
    const pointComponent = new PointsView(point, destinations, offers);
    const pointEditComponent = new EditFormView(point, destinations, offers);

    const turnIntoEdit = () => {
      replace(pointEditComponent, pointComponent);
    };

    const turnIntoPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyup = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        turnIntoPoint();
        document.removeEventListener('keydown', onEscKeyup);
      }
    };

    pointComponent.setClickHandler(() => {
      turnIntoEdit();
      document.addEventListener('keydown', onEscKeyup);

      pointEditComponent.setClickHandler(turnIntoPoint);

      pointEditComponent.setSubmitHandler(() => {
        turnIntoPoint();
        document.removeEventListener('keydown', onEscKeyup);
      });

      pointEditComponent.setResetHandler(() => {
        turnIntoPoint();
        document.removeEventListener('keydown', onEscKeyup);
      });
    });
    render(pointComponent, this.#pointsListComponent.element);
  };
}

export default TripPresenter;
