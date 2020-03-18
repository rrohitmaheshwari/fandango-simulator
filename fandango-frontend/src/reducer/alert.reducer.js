import { alertConstants } from '../helper/constants/alert.constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message.message
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}