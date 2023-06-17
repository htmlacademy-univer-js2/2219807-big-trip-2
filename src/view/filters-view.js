import AbstractView from '../framework/view/abstract-view';

const createFilterItem = (filters, isChecked) => {
  const {name, count} = filters;

  return `<div class="trip-filters__filter">
                  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
                  value="${name}" ${count === 0 ? 'disabled' : ''}
                  checked="${isChecked === name ? 'checked' : ''}">
                  <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
                </div>`;
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItem(filter, index === 0)).join('');

  return `<form class="trip-filters" action="#" method="get">${filterItemsTemplate}
  <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class FiltersView extends AbstractView {
  #filters = null;
  #isChecked = null;

  constructor(filters, isChecked) {
    super();
    this.#filters = filters;
    this.#isChecked = isChecked;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  setFilterChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterChangeHandler);
  };

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
