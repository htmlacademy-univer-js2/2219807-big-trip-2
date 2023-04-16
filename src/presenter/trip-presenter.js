import {render, RenderPosition} from '../render';
import PointsView from '../view/points-view';
import SortView from '../view/sort';
import PointNewForm from '../view/point-new-form';
import EditFormView from '../view/point-edit-form';
import PointsList from '../view/points-list';
import FiltersView from '../view/filters';
import PointModel from '../model/point-model';
import MessageZeroPoints from '../view/empty-points-list';


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
    this.#filterContainer = filterContainer;
    this.#pointModel = pointModel;

    this.#boardPoints = [...this.#pointModel.points];

    if (this.#boardPoints.length === 0) {
      render(new MessageZeroPoints(), this.#container, RenderPosition.BEFOREEND);
      return;
    }

    render(new SortView(), this.#container, RenderPosition.BEFOREEND);
    render(this.#pointsListComponent, this.#container);
    render(new PointNewForm(), this.#pointsListComponent.element, RenderPosition.BEFOREEND);

    for (const point of this.#boardPoints) {
      this.#renderPoint(point, destinations, offers);
    }

    render(new FiltersView(), this.#filterContainer, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point, destinations, offers) => {
    const pointComponent = new PointsView(point, destinations, offers);
    const pointEditComponent = new EditFormView(point, destinations, offers);

    const turnIntoEdit = () => {
      this.#pointsListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const turnIntoPoint = () => {
      this.#pointsListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyup = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        turnIntoPoint();
        document.removeEventListener('keydown', onEscKeyup);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      turnIntoEdit();
      document.addEventListener('keyup', onEscKeyup);

      pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
        turnIntoPoint();
      });

      pointEditComponent.element.querySelector('.event__save-btn').addEventListener('click', (evt) => {
        evt.preventDefault();
        turnIntoPoint();
        document.addEventListener('keyup', onEscKeyup);
      });

      pointEditComponent.element.querySelector('.event__reset-btn').addEventListener('click', (evt) => {
        evt.preventDefault();
        turnIntoPoint();
      });
    });


    render(pointComponent, this.#pointsListComponent.element);
  };
}

export default TripPresenter;
