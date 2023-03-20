import dayjs from 'dayjs';

const humanizeDate = (date) => dayjs(date).format('HH MM');
const getRandomInteger = (max) => Math.floor(Math.random() * max);
const getRandomIntegerInterval = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomBoolean = () => Math.round(Math.random()) === 1;
const getRandomArrayElement = (array) => array[getRandomInteger(array.length)];
const getRandomDate = (timeGap) => {
  const countTimeGap = getRandomIntegerInterval(-timeGap, timeGap);

  return dayjs().add(countTimeGap, 'minutes').toDate();
};

export {getRandomInteger, humanizeDate, getRandomBoolean, getRandomArrayElement, getRandomDate, getRandomIntegerInterval};
