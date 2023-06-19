import dayjs from 'dayjs';

const humanizeDate = (date, template) => dayjs(date).format(template);
const upFirstChar = (line) => line !== '' ? line[0].toUpperCase() + line.slice(1) : '';

const getDifferenceDates = (dateFrom, dateTo) => dayjs(dateTo).diff(dayjs(dateFrom)) > 0;

const enumerateTypesTrip = (tripType, state) => (`
        <div class="event__type-item">
            <input id="event-type-${tripType}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripType}" ${state.isChecked ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--${tripType}" for="event-type-${tripType}-${state.id}}">${upFirstChar(tripType)}</label>
        </div>`);

const reformatOfferTitles = (title) => title.split(' ').join('_');

const isTravelDatePassed = (dateTo) => dateTo && dayjs().isAfter(dateTo, 'minute');

const tripIsInPast = (point) => dayjs().diff(point.dateTo, 'minute') > 0;
const tripIsInFuture = (point) => dayjs().diff(point.dateFrom, 'minute') <= 0;

export {
  humanizeDate,
  enumerateTypesTrip,
  reformatOfferTitles,
  isTravelDatePassed,
  tripIsInFuture,
  tripIsInPast,
  getDifferenceDates
};
