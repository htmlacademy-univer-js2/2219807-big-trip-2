import {generateOffer} from './offer';
import {getRandomArrayElement, getRandomBoolean, getRandomInteger} from '../util';
import {generateDestination} from './destination';
import {tripType} from '../const';


export const generatePoint = () => ({
  basePrice: getRandomInteger(10000),
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: generateDestination(),
  isFavorite: getRandomBoolean(),
  offers: generateOffer(),
  type: getRandomArrayElement(tripType)
});


