import types from '../types';

/*
 *  {
 *    notes: [],
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
    case 2:
      return {};
    case 1:
      return {};
    default:
      return state;
  }
}

