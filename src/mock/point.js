import {offers} from './offer';
import {getRandomArrayElement, getRandomBoolean, getRandomDate, getRandomIntegerInterval} from '../util';
import {MINUTES_GAP, TRIP_TYPES} from '../const';

let destinationId = 1;
let pointId = 1;


const generatePoints = () => ({
  basePrice: getRandomIntegerInterval(10, 300),
  dateFrom: getRandomDate(MINUTES_GAP),
  dateTo: getRandomDate(MINUTES_GAP),
  destination: destinationId++,
  id: pointId++,
  isFavorite: getRandomBoolean(),
  offers: offers,
  type: getRandomArrayElement(TRIP_TYPES)
});


export {generatePoints};
