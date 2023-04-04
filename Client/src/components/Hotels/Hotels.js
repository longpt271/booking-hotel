import HeaderPage from 'components/UI/HeaderPage/HeaderPage';
import React from 'react';

import './Hotels.css';
import SearchList from './SearchList/SearchList';
import SearchResult from './SearchResult/SearchResult';

const Hotels = () => {
  return (
    <section id="hotels">
      <HeaderPage />

      <div className="listContainer">
        <div className="listWrapper container">
          <div className="listSearch">
            <SearchList />
          </div>
          <div className="listResult">
            <SearchResult />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hotels;
