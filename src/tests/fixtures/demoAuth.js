import types from '~types';

export const demoAuth = {
  empty: {
    state: {},
    action: {
      type: null,
      payload: null
    }
  },
  login: {
    state: {},
    action: {
      type: types.LOGIN,
      payload: {
        uid: 'ABC123',
        displayName: 'Joalbert'
      }
    }
  },
  logout: {
    state: {
      uid: 'ABC123',
      name: 'Joalbert'
    },
    action: {
      type: types.LOGOUT
    }
  },
  anything: {
    state: {
      uid: 'ABC123',
      name: 'Joalbert'
    },
    action: {
      type: 'ANYTHING',
      payload: {
        uid: 'DEF456',
        displayName: 'Lisset'
      }
    }
  }
};

