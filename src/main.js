import {render} from './framework/render';
import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import PointModel from './model/point-model';
import FilterModel from './model/filter-model';
import PointsApiService from './utils/points-api';
import MenuView from './view/menu-view';

const AUTHORIZATION = 'Basic jaodjq28';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';
const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const siteEventsContainer = document.querySelector('.trip-events');
const siteMainContainer = document.querySelector('.trip-main');
const siteFiltersContainer = document.querySelector('.trip-controls__filters');
const siteNavigationContainer = document.querySelector('.trip-controls__navigation');

const pointsModel = new PointModel(pointsApiService);
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filtersContainer: siteFiltersContainer,
  pointsModel: pointsModel,
  filterModel: filterModel
});

const tripPresenter = new TripPresenter({
  tripContainer: siteEventsContainer,
  menuContainer: siteMainContainer,
  pointsModel: pointsModel,
  filterModel: filterModel
});

render(new MenuView(), siteNavigationContainer);

pointsModel.init().finally();
tripPresenter.init();
filterPresenter.init();
