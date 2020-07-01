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
      return {
        ...state,
        //notes: [...state.notes, payload],
        active: { ...payload }
      };
    case types.NOTES_LOAD:
      return {
        ...state,
        notes: { ...payload }
      };
    default:
      return state;
  }
}

