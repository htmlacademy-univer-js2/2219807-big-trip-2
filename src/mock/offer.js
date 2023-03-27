import {getRandomArrayElement, getRandomInteger} from '../util';
import {TITLES_OFFER} from '../const';

export const generateOffers = (id) => ({
  id: id,
  title: getRandomArrayElement(TITLES_OFFER),
  price: getRandomInteger(300)
});

export const offers = [
  {
    type: 'taxi',
    offers: [generateOffers(1), generateOffers(2), generateOffers(3)]
  },
  {
    type: 'bus',
    offers: [generateOffers(4), generateOffers(5)]
  },
  {
    type: 'flight',
    offers: [generateOffers(6), generateOffers(7), generateOffers(8)]
  }
];
