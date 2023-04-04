import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import './SearchResultItem.css';
import { SearchContext } from 'context/SearchContext';

const SearchResultItem = ({ item }) => {
  const navigate = useNavigate();

  const arrRoomPrice = item.rooms.map(room => room.price); // lấy tất cả price của rooms
  const lowestPriceRoom = Math.min(...arrRoomPrice); // lấy ra price nhỏ nhất

  // lấy dates từ ctx
  const { dates, options } = useContext(SearchContext);
  const days = dates[0].dayDiff;
  // console.log(options);

  // Xử lý click xem detail
  const handleClick = () => {
    navigate(`/hotels/${item._id}`);
  };

  const replaceImage = err => {
    // set lại ảnh mặc định
    console.log(
      `lỗi link src ${err.target.src} của hotel ${item.name}. (Đã thay bằng ảnh mặc định)`
    );
    err.target.src = '/images/hotel_4.jpg';
  };

  return (
    <div className="row ms-md-2 mb-3 search-list__item">
      <div className="col-12 col-lg-6 col-xl-3 g-0">
        <img
          src={item.photos[0] || '/images/hotel_1.jpg'}
          alt="Search"
          className="search-list__img"
          onError={replaceImage}
          onClick={handleClick}
        />
      </div>
      <div className="col-12 col-lg-6 col-xl-6 ps-md-4 search-list__content">
        <h5>{item.name}</h5>
        <div>{item.distance}m from center</div>
        <div className="search-list__tag">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="search-list__location"
          />
          {item.city}
        </div>
        {/* <div className="search-list__tag">{item.tag || 'Free Parking'}</div> */}
        <b>{item.desc}</b>
        <div>Type: {item.type}</div>
        <div className="search-list__cancel">
          {/* {item.freeCancel && ( */}
          {!item.freeCancel && (
            <>
              <b>Free cancellation</b>
              <br />
              <span>
                You can cancel later, so lock in this great price today!
              </span>
            </>
          )}
        </div>
      </div>
      <div className="col-12 col-xl-3 g-0">
        <div className="search-list__col3">
          <div className="search-list__rate">
            <span>{item.rateText || 'Excellent'}</span>
            <div className="rate-point">{item.rating}</div>
          </div>
          <div className="search-list__price">
            {days === 0 && (
              <>
                <span className="price50per lowerThanMd">
                  ${lowestPriceRoom * options.room}
                </span>
                <p>${(lowestPriceRoom * options.room) / 2}</p>
              </>
            )}
            {days !== 0 && (
              <>
                <small className="lowerThanMd">Starting from</small>
                <p>${lowestPriceRoom * options.room * days}</p>
              </>
            )}
            <span className="lowerThanXs">Includes taxes and fees</span>
            <button className="btn-private" onClick={handleClick}>
              See availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
