import {FilterTypes} from './const';
import {isTravelDatePassed} from './util';

const filter = {
  [FilterTypes.EVERYTHING]: (points) => points,
  [FilterTypes.FUTURE]: (points) => points.filter((point) => !isTravelDatePassed(point.dateFrom)),
  [FilterTypes.PAST]: (points) => points.filter((point) => isTravelDatePassed(point.dateTo))
};

export {filter};
