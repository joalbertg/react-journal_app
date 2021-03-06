import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { JournalEntries } from './JournalEntries';
import {
  startLogout,
  startNewEntry,
  cleanNotes
} from '~actions';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth);
  const handleLogout = () => {
    dispatch(startLogout());
    dispatch(cleanNotes());
  }

  const handleNewEntry = () => {
    dispatch(startNewEntry());
  }

  return(
    <aside className='journal__sidebar'>
      <div className='journal__sidebar-navbar'>
        <h3 className='mt-5'>
          <i className="far fa-moon"></i>
          <span> {name}</span>
        </h3>

        <button
          className="btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div
        onClick={handleNewEntry}
        className="journal__new_entry"
      >
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className='mt-5'>New entry</p>
      </div>
      <JournalEntries />
    </aside>
  );
}

