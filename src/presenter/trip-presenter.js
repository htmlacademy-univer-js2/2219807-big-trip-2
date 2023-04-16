import PointsView from '../view/points-view';
import SortView from '../view/sort';
import EditFormView from '../view/point-edit-form';
import PointsList from '../view/points-list';
import FiltersView from '../view/filters';
import PointModel from '../model/point-model';
import MessageZeroPoints from '../view/empty-points-list';
import {render} from '../framework/render';


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
      render(new MessageZeroPoints(), this.#container);
      return;
    }

    render(new SortView(), this.#container);
    render(this.#pointsListComponent, this.#container);

    for (const point of this.#boardPoints) {
      this.#renderPoint(point, destinations, offers);
    }

    render(new FiltersView(), this.#filterContainer);
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

    pointComponent.setClickHandler(() => {
      turnIntoEdit();
      document.addEventListener('keyup', onEscKeyup);

      pointEditComponent.setClickHandler(turnIntoPoint);

      pointEditComponent.setSubmitHandler(() => {
        turnIntoPoint();
      });

      pointEditComponent.setResetHandler(() => turnIntoPoint());
    });

    render(pointComponent, this.#pointsListComponent.element);
  };
}

export default TripPresenter;
