const POINT_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.'
];

const COUNTRIES = ['Moscow', 'Ekaterinburg', 'Paris'];
const IMAGE_REFERENCE = 'https://loremflickr.com/248/152?random=0.0762463005163317';
const TRIP_TYPES = ['taxi', 'bus', 'flight'];
const TITLES_OFFER = ['Stay overnight', 'Add lunch', 'Add a place pet'];
const MINUTES_GAP = 30;

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
  MAJOR: 'MAJOR'
};

const EmptyListTextType = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.PAST]: 'There are no past events now',
  [FilterTypes.FUTURE]: 'There are no future events now',
};

export {
  POINT_DESCRIPTIONS,
  IMAGE_REFERENCE,
  COUNTRIES,
  TRIP_TYPES,
  MINUTES_GAP,
  TITLES_OFFER,
  FilterTypes,
  SortFields,
  UserActions,
  UpdateTypes,
  EmptyListTextType
};
