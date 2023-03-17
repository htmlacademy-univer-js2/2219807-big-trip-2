import {render, RenderPosition} from './render';
import Filter from './view/filters';
import Trip from './presenter/trip';
import WaypointModel from './model/waypoint-model';

const waypointsModel = new WaypointModel();
const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Trip({container: tripContainer});

tripPresenter.init(filterContainer, waypointsModel);
