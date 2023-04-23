import AbstractView from '../framework/view/abstract-view';

const createFilterItem = (filters, isChecked) => {
  const {name, count} = filters;

  return `<div class="trip-filters__filter">
                  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
                  value="everything" ${count === 0 ? 'disabled' : ''}
                  checked="${isChecked ? 'checked' : ''}">
                  <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
                </div>`;
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItem(filter, index === 0)).join('');

  return (`<form class="trip-filters" action="#" method="get">${filterItemsTemplate}</form>`);
};

export default class FiltersView extends AbstractView {
  #filters;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
