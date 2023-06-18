import {filter} from '../utils/filters';
import {FilterTypes} from '../utils/const';
import {tripIsInFuture, tripIsInPast} from '../utils/util';

const generateFilter = (points) => Object.entries(filter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    count: filterPoints(points).length
  }),
);

const filterOut = {
  [FilterTypes.EVERYTHING]: (points) => points,
  [FilterTypes.FUTURE]: (points) => points.filter((point) => tripIsInFuture(point)),
  [FilterTypes.PAST]: (points) => points.filter((point) => tripIsInPast(point)),
};

export {filterOut, generateFilter};
