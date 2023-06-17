import FiltersView from '../view/filters-view';
import {remove, render, replace} from '../framework/render';
import {FilterTypes, UpdateTypes} from '../utils/const';

export default class FilterPresenter {
  #filtersContainer;
  #filterModel;
  #pointsModel;
  #filtersComponent;

  constructor(filtersContainer, filterModel, pointsModel) {
    this.#filtersContainer = filtersContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModeEvent);
    this.#filterModel.addObserver(this.#handleModeEvent);
  }

  get filters() {
    return [
      {
        type: FilterTypes.EVERYTHING,
        name: 'everything',
        count: 1,
      },
      {
        type: FilterTypes.PAST,
        name: 'past',
        count: 1,
      },
      {
        type: FilterTypes.FUTURE,
        name: 'future',
        count: 1,
      },
    ];
  }

  init() {
    const previousFilterComponent = this.#filtersComponent;
    this.#filtersComponent = new FiltersView(this.filters, this.#filterModel.filter);

    if (previousFilterComponent) {
      replace(this.#filtersComponent, previousFilterComponent);
      remove(previousFilterComponent);
      return;
    }
    render(this.#filtersComponent, this.#filtersContainer);
  }

  #handleModeEvent = () => {
    this.init();
  };

  #handleFilterClick = (filterType) => {
    if (!this.#filterModel.filter === filterType) {
      this.#filterModel.setFilter(UpdateTypes.MAJOR, filterType);
    }
  };
}
