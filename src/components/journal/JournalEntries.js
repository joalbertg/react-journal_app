import React from 'react';
import { useSelector } from 'react-redux';

import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
  const { notes } = useSelector(state => state.notes);
  const indexes = Object.keys(notes);

  return(
    <div className='journal__entries'>
      {
        indexes.map(index => (
          <JournalEntry
            key={index}
            note={notes[index]} />
        ))
      }
    </div>
  );
}

