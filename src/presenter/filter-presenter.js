import FiltersView from '../view/filters-view';
import {remove, render, replace} from '../framework/render';
import {FilterTypes, UpdateTypes} from '../utils/const';
import {filterOut} from '../utils/const';

export default class FilterPresenter {
  #filtersContainer;
  #filtersComponent;

  #filterModel;
  #pointsModel;

  constructor({filtersContainer, filterModel, pointsModel}) {
    this.#filtersContainer = filtersContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    //this.#pointsModel.addObserver(this.#handleModeEvent);
    //this.#filterModel.addObserver(this.#handleModeEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FilterTypes.EVERYTHING,
        name: 'everything',
        isEmpty: filterOut[FilterTypes.EVERYTHING](points).length === 0,
      },
      {
        type: FilterTypes.PAST,
        name: 'past',
        isEmpty: filterOut[FilterTypes.PAST](points).length === 0,
      },
      {
        type: FilterTypes.FUTURE,
        name: 'future',
        isEmpty: filterOut[FilterTypes.FUTURE](points).length === 0,
      },
    ];
  }

  init() {
    const previousFilterComponent = this.#filtersComponent;
    this.#filtersComponent = new FiltersView(this.filters, this.#filterModel.filter, this.#handleFilterClick);

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
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateTypes.MAJOR, filterType);
  };
}
