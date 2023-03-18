import {generateDestination} from './destination';
import {generateOffer} from './offer';


const generatePoint = () => ({
  basePrice: 1100,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: generateDestination().id,
  isFavorite: false,
  offers: generateOffer(),
  type: 'bus'
});

export {generatePoint};

