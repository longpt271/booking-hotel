import React from 'react';

import './Type.css';
import TypeItem from './TypeItem';

const Type = props => {
  return (
    <div className="row type-list">
      {props.data.map((item, i) => (
        <TypeItem
          key={Math.random()}
          name={item.type}
          count={item.count}
          image={`/images/type_${i + 1}.jpg`}
        />
      ))}
    </div>
  );
};

export default Type;
