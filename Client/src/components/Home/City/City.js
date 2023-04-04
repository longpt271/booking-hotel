import React from 'react';

import './City.css';
import CityItem from './CityItem';

const City = props => {
  return (
    <div className="row mb-5 city-list">
      {props.data.map((item, i) => (
        <CityItem
          key={Math.random()}
          name={item.name}
          countCity={item.count}
          image={`./images/city_${i + 1}.jpg`}
        />
      ))}
    </div>
  );
};

export default City;
