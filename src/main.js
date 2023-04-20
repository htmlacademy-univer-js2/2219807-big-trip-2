import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/point-model';

const pointsModel = new PointModel();
const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({container: tripContainer});

tripPresenter.init(filterContainer, pointsModel);
