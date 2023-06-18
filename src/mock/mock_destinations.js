import {COUNTRIES, IMAGE_REFERENCE, POINT_DESCRIPTIONS} from '../utils/const';
import {getRandomInteger} from '../utils/util';

const getRandomDescription = () => POINT_DESCRIPTIONS[getRandomInteger(POINT_DESCRIPTIONS.length - 1)];
const getRandomCountry = () => COUNTRIES[getRandomInteger(COUNTRIES.length)];
const getRandomPicture = () => `${IMAGE_REFERENCE}}`;
const getPicturesDestination = () => (
  [
    {
      src: getRandomPicture(),
      description: getRandomDescription()
    },
    {
      src: getRandomPicture(),
      description: getRandomDescription()
    }
  ]
);

const generateDestination = (id) => ({
  id: id,
  description: getRandomDescription(),
  name: getRandomCountry(),
  pictures: getPicturesDestination()
});

const mockDestinations = [generateDestination(1), generateDestination(2), generateDestination(3)];

export {mockDestinations, getRandomDescription, getRandomPicture};
