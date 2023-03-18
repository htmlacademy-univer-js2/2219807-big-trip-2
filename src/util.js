import dayjs from 'dayjs';

const humanizeDate = (date) => {
  return dayjs(date).format('D MMMM');
};

const getRandomInteger = (max) => {
  return Math.floor(Math.random() * max);
};

export {getRandomInteger, humanizeDate};
