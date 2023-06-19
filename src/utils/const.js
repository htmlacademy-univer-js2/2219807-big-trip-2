import {tripIsInFuture, tripIsInPast} from './util';
import {getDifferenceDates} from './util';

const TRIP_TYPES = ['taxi', 'bus', 'flight'];

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const SortFields = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

const UserActions = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateTypes = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const EmptyListTextType = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.PAST]: 'There are no past events now',
  [FilterTypes.FUTURE]: 'There are no future events now',
};

const ModesEditingPoint = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

const filterOut = {
  [FilterTypes.EVERYTHING]: (points) => points,
  [FilterTypes.FUTURE]: (points) => points.filter((point) => tripIsInFuture(point)),
  [FilterTypes.PAST]: (points) => points.filter((point) => tripIsInPast(point)),
};

const sorting = {
  [SortFields.DAY]: (points) => points.sort((pointA, pointB) => getDifferenceDates(pointB.dateFrom, pointA.dateFrom)),
  [SortFields.TIME]: (points) => points.sort((pointA, pointB) => getDifferenceDates(pointA.dateFrom, pointA.dateTo) - getDifferenceDates(pointB.dateFrom, pointB.dateTo)),
  [SortFields.PRICE]: (points) => points.sort((pointA, pointB) => pointA.basePrice - pointB.basePrice)
};

const Methods = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const BLANK_POINT = {
  basePrice: 100,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: 1,
  isFavorite: false,
  offers: [],
  type: TRIP_TYPES[0],
};

export {
  TRIP_TYPES,
  FilterTypes,
  SortFields,
  UserActions,
  UpdateTypes,
  EmptyListTextType,
  ModesEditingPoint,
  filterOut,
  sorting,
  Methods,
  BLANK_POINT
};
