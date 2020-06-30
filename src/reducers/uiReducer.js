import { types } from '../types/types';

const initialState = {
  loading: false,
  msgError: null
}

export const uiReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case types.UI_SET_ERROR:
      return {
        ...state,
        msgError: payload
      };
    case types.UI_REMOVE_ERROR:
      return {
        ...state,
        msgError: null
      }
    default:
      return state;
  }
}
