import {countries, imageReference, maxImageId, pointDescriptions} from '../const';
import {getRandomInteger} from '../util';

const getRandomDescription = () => pointDescriptions[getRandomInteger(pointDescriptions.length - 1)];
const getRandomCountry = () => countries[getRandomInteger(countries.length - 1)];
const getRandomPicture = () => `${imageReference}${getRandomInteger(maxImageId)}`;

const generateDestination = () => ({
  id: 1,
  description: getRandomDescription(),
  name: getRandomCountry(),
  pictures: [
    {
      src: getRandomPicture(),
      description: 'Chamonix parliament building'
    }
  ]
});

export {generateDestination};
