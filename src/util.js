import dayjs from 'dayjs';

const humanizeDate = (date) => dayjs(date).format('HH MM');
const getRandomInteger = (max) => Math.floor(Math.random() * max);
const getRandomBoolean = () => Math.round(Math.random()) === 1;

export {getRandomInteger, humanizeDate, getRandomBoolean};
