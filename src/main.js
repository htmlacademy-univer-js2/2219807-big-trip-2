import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/point-model';
import {generateFilter} from './mock/filter';
import {render} from './framework/render';
import FiltersView from './view/filters-view';


const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');

const pointsModel = new PointModel();
pointsModel.init();
const filters = generateFilter(pointsModel.points);

const tripPresenter = new TripPresenter(siteMainElement.querySelector('.trip-events'), pointsModel);
tripPresenter.init();

render(new FiltersView(filters), siteHeaderElement.querySelector('.trip-controls__filters'));
