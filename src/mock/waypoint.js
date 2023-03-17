import {getRandomInteger} from '../util';
import {countries, imageReference, maxImageId, waypointDescriptions} from '../const';

const getRandomDescription = () => waypointDescriptions[getRandomInteger(waypointDescriptions.length - 1)];
const getRandomPicture = () => `${imageReference}${getRandomInteger(maxImageId)}`;
const getRandomCountry = () => countries[getRandomInteger(countries.length - 1)];

export const generateWaypoint = () => ({
  id: 1,
  description: getRandomDescription(),
  pictures: [{
    src: getRandomPicture(),
    description: getRandomCountry()
  }]
});
