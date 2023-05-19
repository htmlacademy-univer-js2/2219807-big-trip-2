import {COUNTRIES, IMAGE_REFERENCE, MAX_IMAGE_ID, POINT_DESCRIPTIONS} from '../utils/const';
import {getRandomInteger} from '../utils/util';

const getRandomDescription = () => POINT_DESCRIPTIONS[getRandomInteger(POINT_DESCRIPTIONS.length - 1)];
const getRandomCountry = () => COUNTRIES[getRandomInteger(COUNTRIES.length)];
const getRandomPicture = () => `${IMAGE_REFERENCE}${getRandomInteger(MAX_IMAGE_ID)}`;
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

const destinations = [generateDestination(1), generateDestination(2), generateDestination(3)];

export {destinations, getRandomDescription, getRandomPicture};
