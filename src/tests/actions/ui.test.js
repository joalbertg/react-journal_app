import {
  setError,
  removeError,
  startLoading,
  finishLoading
} from '~actions/ui';
import types from '~types';

describe('Tests ui actions', () => {
  test('Should return a object error', () => {
    const error = 'Error: help!';
    const action = setError(error);
    expect(action).toEqual({
      type: types.UI_SET_ERROR,
      payload: error
    });
  });

  test('Should return UI_REMOVE_ERROR', () => {
    const action = removeError();
    expect(action).toEqual({
      type: types.UI_REMOVE_ERROR
    });
  });

  test('Should return UI_START_LOADING', () => {
    const action = startLoading();
    expect(action).toEqual({
      type: types.UI_START_LOADING
    });
  });

  test('Should return UI_FINISH_LOADING', () => {
    const action = finishLoading();
    expect(action).toEqual({
      type: types.UI_FINISH_LOADING
    });
  });
});

