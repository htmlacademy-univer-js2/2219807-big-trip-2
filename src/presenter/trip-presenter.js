import {render, RenderPosition} from '../render';
import PointsView from '../view/points-view';
import SortView from '../view/sort';
import PointNewForm from '../view/point-new-form';
import EditFormView from '../view/point-edit-form';
import PointsList from '../view/points-list';
import FiltersView from '../view/filters';
import PointModel from '../model/point-model';
import {destinations} from '../mock/destinations';
import {offers} from '../mock/offer';


class TripPresenter {
  #boardPoints;
  #pointModel;
  #filterContainer;
  #destinations;
  #offers;
  #component;
  #container;

  constructor({container}) {
    this.#component = new PointsList();
    this.#container = container;
    this.#pointModel = new PointModel();
  }

  init(filterContainer, pointModel) {
    this.#filterContainer = filterContainer;
    this.#pointModel = pointModel;
    this.#destinations = this.#pointModel.destinations;
    this.#boardPoints = [...this.#pointModel.points];
    this.#offers = offers;

    render(new SortView(), this.#container, RenderPosition.BEFOREEND);
    render(this.#component, this.#container);
    render(new PointNewForm(), this.#component.element, RenderPosition.BEFOREEND);
    render(new EditFormView(this.#boardPoints[1], this.#destinations, this.#offers), this.#component.element, RenderPosition.BEFOREEND);

    for (const point of this.#boardPoints) {
      this.#renderPoint(point);
    }

    render(new FiltersView(), this.#filterContainer, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointComponent = new PointsView(point, this.#destinations, this.#offers);

    render(pointComponent, this.#component.element);
  }
}

export default TripPresenter;
