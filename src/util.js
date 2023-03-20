import dayjs from 'dayjs';

const humanizeDate = (date) => dayjs(date).format('HH MM');
const getRandomInteger = (max) => Math.floor(Math.random() * max);
const getRandomBoolean = () => Math.round(Math.random()) === 1;
const getRandomArrayElement = (array) => array[getRandomInteger(array.length)];

export {getRandomInteger, humanizeDate, getRandomBoolean, getRandomArrayElement};
