import {generateOffer} from './offer';
import {getRandomArrayElement, getRandomBoolean, getRandomDate, getRandomIntegerInterval} from '../util';
import {generateDestination} from './destination';
import {minutesGap, tripTypes} from '../const';


export const generatePoints = () => (
  {
    basePrice: getRandomIntegerInterval(10, 300),
    dateFrom: getRandomDate(minutesGap),
    dateTo: getRandomDate(minutesGap),
    destination: generateDestination(),
    isFavorite: getRandomBoolean(),
    offers: generateOffer(),
    type: getRandomArrayElement(tripTypes)
  });
