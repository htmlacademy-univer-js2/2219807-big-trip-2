import {COUNTRIES, IMAGE_REFERENCE, MAX_IMAGE_ID, POINT_DESCRIPTIONS} from '../const';
import {getRandomInteger} from '../util';

const getRandomDescription = () => POINT_DESCRIPTIONS[getRandomInteger(POINT_DESCRIPTIONS.length - 1)];
const getRandomCountry = () => COUNTRIES[getRandomInteger(COUNTRIES.length - 1)];
const getRandomPicture = () => `${IMAGE_REFERENCE}${getRandomInteger(MAX_IMAGE_ID)}`;

const generateDestination = (id) => ({
  id: id,
  description: getRandomDescription(),
  name: getRandomCountry(),
  pictures : Array.from({length: getRandomInteger(3)}, getRandomPicture, getRandomDescription())
});

export const destinations = [generateDestination(1), generateDestination(2), generateDestination(3)];
