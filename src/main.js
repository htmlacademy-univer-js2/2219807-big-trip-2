import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/point-model';
import {generateFilter} from './mock/filter';
import {render} from './framework/render';
import FiltersView from './view/filters';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const tripPresenter = new TripPresenter(siteMainElement.querySelector('.trip-events'));


const pointsModel = new PointModel();

pointsModel.init();
tripPresenter.init(pointsModel);

const filters = generateFilter(pointsModel.points);
render(new FiltersView(filters), siteHeaderElement.querySelector('.trip-controls__filters'));
