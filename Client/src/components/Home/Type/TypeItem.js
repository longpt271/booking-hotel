import React from 'react';

import './TypeItem.css';

const TypeItem = props => {
  return (
    <div className="col type-item">
      <img src={props.image} alt="Type" className="img-type" />
      <div className="type-item__content">
        <p>{props.name}s</p>
        <span>
          {props.count} {props.name}s
        </span>
      </div>
    </div>
  );
};

export default TypeItem;
