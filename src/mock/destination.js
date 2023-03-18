import {countries, imageReference, maxImageId, waypointDescriptions} from '../const';
import {getRandomInteger} from '../util';

const getRandomDescription = () => waypointDescriptions[getRandomInteger(waypointDescriptions.length - 1)];
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
