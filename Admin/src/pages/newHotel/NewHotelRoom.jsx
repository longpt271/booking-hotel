import { useContext, useEffect, useState } from 'react';

import './newHotel.scss';
import ApiContext from 'context/ApiContext';

const NewHotelRoom = ({ enteredRooms, handleSelect, notValidRooms }) => {
  const ctx = useContext(ApiContext);

  // lấy data từ api
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    // get Api
    fetch(ctx.requests.getRooms)
      .then(res => res.json())
      .then(data => {
        setRooms(data);
      })
      .catch(err => console.log(err));
  }, [ctx.requests.getRooms]);

  return (
    <div className="selectRooms">
      <label>Rooms</label>
      <select
        id="rooms"
        multiple
        value={enteredRooms}
        onChange={handleSelect}
        className={notValidRooms ? 'notValidRooms' : ''}
      >
        {rooms.map(room => (
          <option key={room._id} value={room._id}>
            {room.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NewHotelRoom;
