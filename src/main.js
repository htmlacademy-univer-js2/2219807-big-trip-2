import Trip from './presenter/trip';
import PointModel from './model/point-model';

const waypointsModel = new PointModel();
const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Trip({container: tripContainer});

tripPresenter.init(filterContainer, waypointsModel);
