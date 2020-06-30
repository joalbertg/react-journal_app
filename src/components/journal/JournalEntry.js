import React from 'react';

export const JournalEntry = () => {
  return(
    <div className='journal__entry pointer'>
      <div
        className='journal__entry-picture'
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://as.com/meristation/imagenes/2019/12/16/noticias/1576512994_147081_1576516758_noticia_normal.jpg)'
        }}
      >
      </div>
      <div className='journal__entry-body'>
        <p className='journal__entry-title'>
          Elit perspiciatis sint
        </p>
        <p className='journal__entry-content'>
          Elit perspiciatis sint cumque repellendus neque. Aliquid sunt facilis ab
        </p>
      </div>
      <div className='journal__entry-date-box'>
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
}

