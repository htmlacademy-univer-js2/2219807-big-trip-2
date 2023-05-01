import AbstractView from '../framework/view/abstract-view';

const createMessageZeroPoints = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class MessageZeroPoints extends AbstractView{
  get template() {
    return createMessageZeroPoints();
  }
}


