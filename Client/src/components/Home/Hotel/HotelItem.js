import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

import './HotelItem.css';
const HotelItem = props => {
  // console.log(props.image);

  // hàm bắt error từ img, nếu link ảnh đã có lỗi
  const replaceImage = err => {
    // set lại ảnh mặc định
    console.log(
      `lỗi link src ${err.target.src} của hotel ${props.name} (Đã thay bằng ảnh mặc định)`
    );
    err.target.src = '/images/hotel_1.jpg';
  };

  return (
    <div className="hotel-item">
      <div className="image">
        <Link to={`hotels/${props._id}`}>
          <img
            src={props.image}
            alt="Hotel"
            className="img-hotel"
            onError={replaceImage}
          />
        </Link>
      </div>

      <div className="hotel-content">
        <Link to={`hotels/${props._id}`}>{props.name}</Link>
        <small>{props.desc}</small>
        <div className="hotel-item-price">
          <span className="fw-bold">${props.price}</span>
        </div>
        <div className="hotel-item-bottom">
          <StarRatings
            rating={props.rate}
            starDimension="15px"
            starSpacing="5px"
            numberOfStars={5}
          />
          <div>{props.city}</div>
        </div>
      </div>
    </div>
  );
};

export default HotelItem;
