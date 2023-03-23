import {countries, imageReference, maxImageId, pointDescriptions} from '../const';
import {getRandomInteger} from '../util';

const getRandomDescription = () => pointDescriptions[getRandomInteger(pointDescriptions.length - 1)];
const getRandomCountry = () => countries[getRandomInteger(countries.length - 1)];
const getRandomPicture = () => `${imageReference}${getRandomInteger(maxImageId)}`;

const generateDestination = () => ({
  id: 2, description: getRandomDescription(), name: getRandomCountry(), pictures: [{
    src: getRandomPicture(), description: getRandomDescription()
  }]
});

const destinations = [
  {
    id: 1,
    description: 'ex test 3',
    name: 'ex city 3',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'ex city 3 parliament building'
      }
    ]
  },
  {
    id: 2,
    description: 'ex test 2',
    name: 'ex city 2',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'ex city 2 parliament building'
      }
    ]
  },
  {
    id: 3,
    description: 'ex test 1',
    name: 'ex city 1',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'ex city 1 parliament building'
      }
    ]
  }
];

export {generateDestination, destinations};
