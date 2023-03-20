import {generateOffer} from './offer';
import {getRandomArrayElement, getRandomBoolean, getRandomDate, getRandomIntegerInterval} from '../util';
import {generateDestination} from './destination';
import {daysGap, tripType} from '../const';

const generatePoint = () => (
  {
    basePrice: getRandomIntegerInterval(10,300),
    dateFrom: getRandomDate(daysGap, 'm'),
    dateTo: getRandomDate(daysGap, 'm'),
    destination: generateDestination(),
    isFavorite: getRandomBoolean(),
    offers: generateOffer(),
    type: getRandomArrayElement(tripType)
  });

export {generatePoint};
