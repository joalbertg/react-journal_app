import types from '~types';

export const authReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch(type) {
    case types.LOGIN:
      return {
        uid: payload.uid,
        name: payload.displayName
      };
    case types.LOGOUT:
      return {};
    default:
      return state;
  }
}

