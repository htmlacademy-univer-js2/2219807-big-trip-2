import {FILTER_TYPE} from './const';
import {isTravelDatePassed} from './util';

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points.map((point) => point),
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => isTravelDatePassed(point.dateFrom)),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => isTravelDatePassed(point.dateFrom))
};

export {filter};
