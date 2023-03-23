import {offers} from './offer';
import {getRandomArrayElement, getRandomBoolean, getRandomDate, getRandomIntegerInterval} from '../util';
import {generateDestination} from './destinations';
import {minutesGap, tripTypes} from '../const';


const generatePoints = () => ({
  basePrice: getRandomIntegerInterval(10, 300),
  dateFrom: getRandomDate(minutesGap),
  dateTo: getRandomDate(minutesGap),
  destination: generateDestination(),
  id: 2,
  isFavorite: getRandomBoolean(),
  offers: offers,
  type: getRandomArrayElement(tripTypes)
});

const points = [{
  basePrice: 1200,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: 1,
  id: 1,
  isFavorite: true,
  offers: [8,9],
  type: 'flight'
}, {
  basePrice: 1400,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: 3,
  id: 3,
  isFavorite: false,
  offers: [1,2,3,4,5],
  type: 'taxi'
}, {
  basePrice: 200,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: 2,
  id: 1,
  isFavorite: true,
  offers: [6,7],
  type: 'bus'
},];

export {generatePoints, points};
