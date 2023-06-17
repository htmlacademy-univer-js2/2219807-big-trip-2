import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/point-model';
import {generateFilter} from './mock/filter';
import {render} from './framework/render';
import FiltersView from './view/filters-view';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');

const filterModel = new FilterModel();


const pointsModel = new PointModel();
pointsModel.init();
const filters = generateFilter(pointsModel.points);

const filterPresenter = new FilterPresenter(siteHeaderElement.querySelector('.trip-controls__filters'), filterModel, pointsModel);
filterPresenter.init();

const tripPresenter = new TripPresenter(siteMainElement.querySelector('.trip-events'), pointsModel, FilterModel);
tripPresenter.init();

render(new FiltersView(filters), siteHeaderElement.querySelector('.trip-controls__filters'));
