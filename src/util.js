import dayjs from 'dayjs';

const humanizeDateTo = (date, template) => dayjs(date).format(template);
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
  return dayjs().add(countTimeGap, 'minutes').format('YYYY-MM-DDTHH:mm');
};

const getDifferenceTime = (dateFrom, dateTo) => {
  let differenceMinutes = dayjs(dateTo).format('mm') - dayjs(dateFrom).format('mm');
  let differenceHours = dayjs(dateTo).format('HH') - dayjs(dateFrom).format('HH');

  if (differenceMinutes < 0) {
    differenceHours--;
    differenceMinutes += 60;
  }

  return `${differenceHours} HOURS - ${differenceMinutes} MINUTES`;
};

export {
  getRandomInteger,
  humanizeDateTo,
  getRandomBoolean,
  getRandomArrayElement,
  getRandomDate,
  getRandomIntegerInterval,
  getDifferenceTime
};
