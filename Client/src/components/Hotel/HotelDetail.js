import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

import './HotelDetail.css';
import { SearchContext } from 'context/SearchContext';
import { AuthContext } from 'context/AuthContext';
import Reserve from 'components/reserve/Reserve';

const HotelDetail = ({ item }) => {
  const navigate = useNavigate();
  // Tạo giá trị mặc định cho photos tránh lỗi
  const photos = item.photos || [];
  const rooms = item.rooms || [];

  const arrRoomPrice = rooms.map(room => room.price); // lấy tất cả price của rooms
  const lowestPriceRoom = Math.min(...arrRoomPrice); // lấy ra price nhỏ nhất

  const [openModal, setOpenModal] = useState(false);

  // lấy dates từ ctx
  const { dates, options } = useContext(SearchContext);
  const days = dates[0].dayDiff;

  // lấy ra user từ ctx
  const { user } = useContext(AuthContext);

  const handlerClick = () => {
    if (user) {
      setOpenModal(prev => !prev);
    } else {
      navigate('/auth');
    }
  };

  // check độ rộng màn hình website (chattGPT =))
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // nút next, prev của photos
  const [currentImg, setCurrentImg] = useState(0);

  const handlePrevClick = () => {
    setCurrentImg(currentImg - 1);
  };

  const handleNextClick = () => {
    setCurrentImg(currentImg + 1);
  };

  return (
    <div className="detail-list">
      <div className="detail-list-header">
        <div>
          <h3>{item.name}</h3>
          <div className="detail-list-address">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{item.address}</span>
          </div>
          <div className="detail-list-distance">
            <span>Excellent location – {item.distance}m from center</span>
          </div>
          <span className="detail-list-price">
            Book a stay over ${lowestPriceRoom} at this property and get a free
            airport taxi
          </span>
        </div>
        {/* <button className="btn-private detail-list-btn">
          Reserve or Book Now!
        </button> */}
      </div>
      <div className="detail-list-photos">
        {photos.length !== 0 &&
          width >= 992 &&
          photos.map(photo => (
            <img src={photo} alt={photo} key={Math.random()} />
          ))}
        {photos.length !== 0 && width < 992 && (
          <div>
            <button onClick={handlePrevClick} disabled={currentImg === 0}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <img src={photos[currentImg]} alt={`photos ${currentImg + 1}`} />
            <button
              onClick={handleNextClick}
              disabled={currentImg === photos.length - 1}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        )}
      </div>
      <div className="detail-list-bottom">
        <div className="detail-list-description">
          <h3>{item.name}</h3>
          <span>
            {item.desc}, which offers free Wi-Fi in all rooms. Strategically
            situated in District 1, allowing you access and proximity to local
            attractions and sights. Don't leave before paying a visit to the
            famous War Remnants Museum. Rated with 4 stars, this high-quality
            property provides guest with access to massage, restaurant fitness
            center on-site.
          </span>
        </div>
        <div className="detail-list-ninePrice">
          {/* <h5>Perfect for a 9-night stay!</h5>
          <div>
            Located in the real heart of Krakow this property has an excellent
            location score of 9.8!
          </div> */}

          {days === 0 && (
            <div className="detail-list-ninePrice_mobile">
              <small>
                You got <b>50%</b> off!
              </small>
              <div>
                <p>${(lowestPriceRoom * options.room) / 2}</p>
                <span>{` (${days} nights)`}</span>
              </div>
            </div>
          )}
          {days !== 0 && (
            <div className="detail-list-ninePrice_mobile">
              <small>Starting from</small>
              <div>
                <p>${lowestPriceRoom * options.room * days}</p>
                <span>{` (${days || 1} nights)`}</span>
              </div>
            </div>
          )}
          <button
            className="btn-private detail-list-btn"
            onClick={handlerClick}
          >
            {openModal ? 'Close Reserve!' : 'Reserve or Book Now!'}
          </button>
        </div>
      </div>
      {openModal && <Reserve setOpen={setOpenModal} data={item} />}
    </div>
  );
};

export default HotelDetail;
