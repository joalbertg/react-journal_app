import React from 'react';

import types from '~types';

describe('Tests types', () => {
  test('Should have a correct structure', () => {
    const currentTypes = {
      LOGIN: '[AUTH] LOGIN',
      LOGOUT: '[AUTH] LOGOUT',

      UI_SET_ERROR: '[UI] UI_SET_ERROR',
      UI_REMOVE_ERROR: '[UI] UI_REMOVE_ERROR',

      UI_START_LOADING: '[UI] UI_START_LOADING',
      UI_FINISH_LOADING: '[UI] UI_FINISH_LOADING',

      NOTES_NEW_ENTRY: '[NOTES] NOTES_NEW_ENTRY',
      NOTES_ACTIVE: '[NOTES] NOTES_ACTIVE',
      NOTES_LOAD: '[NOTES] NOTES_LOAD',
      NOTES_UPDATED: '[NOTES] NOTES_UPDATED',
      NOTES_FILE_URL: '[NOTES] NOTES_FILE_URL',
      NOTES_DELETE: '[NOTES] NOTES_DELETE',
      NOTES_LOGOUT_CLEANING: '[NOTES] NOTES_LOGOUT_CLEANING',
    };

    expect(currentTypes).toEqual(types);
  });
});

