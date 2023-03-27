import {offers} from './offer';
import {getRandomBoolean, getRandomDate, getRandomIntegerInterval} from '../util';
import {destinations} from './destinations';
import {MINUTES_GAP} from '../const';

const generatePoints = (id, type) => ({
  basePrice: getRandomIntegerInterval(10, 300),
  dateFrom: getRandomDate(MINUTES_GAP),
  dateTo: getRandomDate(MINUTES_GAP),
  destination: destinations,
  id: id,
  isFavorite: getRandomBoolean(),
  offers: offers,
  type: type
});

const points = [generatePoints(1, 'bus'), generatePoints(2, 'taxi'), generatePoints(3, 'flight')];

export {points};
