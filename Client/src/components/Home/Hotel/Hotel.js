import React from 'react';

import './Hotel.css';
import HotelItem from './HotelItem';

const findLowestPrice = rooms => {
  const arrRoomPrice = rooms.map(room => room.price); // lấy tất cả price của rooms
  return Math.min(...arrRoomPrice); // lấy ra price nhỏ nhất
};

const Hotel = props => {
  return (
    <div className="hotel-list">
      {props.data.map((item, i) => (
        <HotelItem
          key={Math.random()}
          _id={item._id}
          name={item.name}
          city={item.city}
          desc={item.desc}
          price={findLowestPrice(item.rooms)}
          rate={item.rating}
          image={item.photos[0] || '/images/hotel_1.jpg'} // nếu link ảnh đã có undefined
        />
      ))}
    </div>
  );
};

export default Hotel;
