import types from '../types';

/*
 *  {
 *    notes: {},
 *    active: null,
 *    active: {
 *      id: 'qwertyui1234567890',
 *      title: '',
 *      body: '',
 *      imageUrl: '',
 *      date: 123456789
 *    }
 */

const initialState = {
  notes: [],
  active: null
};

export const notesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case types.NOTES_ACTIVE:
      let active = null;

      if(state.active?.id === payload.id) {
        active = { ...state.active, ...payload }
      } else {
        active = { ...payload }
      }

      return {
        ...state,
        active,
        notes: { ...state.notes, [payload.id]: { ...payload } }
      };
    case types.NOTES_LOAD:
      return {
        ...state,
        notes: { ...payload }
      };
    case types.NOTES_UPDATED:
      return {
        ...state,
        notes: { ...state.notes, [payload.id]: { ...payload } }
      };
    case types.NOTES_DELETE:
      delete state.notes[payload.id];
      return {
        ...state,
        active: null
      };
    case types.NOTES_LOGOUT_CLEANING:
      return {
        notes: {},
        active: null
      };
    default:
      return state;
  }
}

