import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CityItem.css';
import { SearchContext } from 'context/SearchContext';

const CityItem = props => {
  const searchCtx = useContext(SearchContext);
  const navigate = useNavigate();

  const [dates] = useState(searchCtx.dates);
  const [options] = useState(searchCtx.options);

  const handleClick = () => {
    searchCtx.dispatch({
      type: 'SEARCH_START',
      payload: { city: props.name, dates, options },
    });

    // điều hướng sang page hotels
    navigate('/hotels');
  };
  return (
    <div className="col city-item" onClick={handleClick}>
      <div className="city-item__content">
        <h2>{props.name}</h2>
        <h4>{props.countCity || 0} properties</h4>
      </div>
      <img src={props.image} alt="city" className="img-city" />
    </div>
  );
};

export default CityItem;
