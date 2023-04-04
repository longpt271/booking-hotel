import { useContext, useEffect, useState } from 'react';

import './reserveRoom.css';
import ApiContext from 'context/ApiContext';

const ReserveRoom = ({
  dataFetch,
  selectedRooms,
  setSelectedRooms,
  isAvailable,
}) => {
  // state lưu data room fetch được
  const [roomsData, setRoomsData] = useState([]);
  // fetch data rooms
  const apiCtx = useContext(ApiContext);
  const urlFetchHotelRoom = `${apiCtx.requests.getHotelRoom}/${dataFetch._id}`;
  useEffect(() => {
    fetch(urlFetchHotelRoom)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setRoomsData(data);
      })
      .catch(err => console.log(err));
  }, [urlFetchHotelRoom]);

  // Xử lý checkbox
  const handleSelect = e => {
    const checked = e.target.checked;

    // console.log(e.target.dataset);
    const value = e.target.value;
    const dataPrice = +e.target.dataset.price; // lấy data của "Custom Attributes"
    const roomNumber = +e.target.dataset.number;

    // lưu lại state
    setSelectedRooms(
      checked
        ? // nếu check thêm
          [...selectedRooms, { _id: value, roomNumber, price: dataPrice }]
        : // nếu check xóa
          selectedRooms.filter(item => item._id !== value)
    );
  };
  return (
    <div className="rRoom">
      {roomsData.map(item => {
        return (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                <span>Max people:</span>
                <b>{item.maxPeople}</b>
              </div>
              <b className="rPrice">${item.price}</b>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map(roomNumber => (
                <div className="roomCheckbox" key={roomNumber._id}>
                  <label htmlFor={roomNumber._id}>{roomNumber.number}</label>
                  <input
                    id={roomNumber._id}
                    type="checkbox"
                    value={roomNumber._id}
                    data-price={item.price} // sử dụng "Custom Attributes"
                    data-number={roomNumber.number}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReserveRoom;
