import { SET_SEQUENCES } from './actions';

const initialState = [];

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SEQUENCES:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
