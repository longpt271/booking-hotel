import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './newRoom.scss';
import Layout from 'components/layout/Layout';
import ApiContext from 'context/ApiContext';
import { toastActions } from 'store/toast';

const NewRoom = ({ editing }) => {
  // Sử dụng useContext
  const ctx = useContext(ApiContext);

  // navigate điều hướng
  const navigate = useNavigate();

  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  //  dùng params lấy id room
  const params = useParams();

  // lấy data từ api
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    // get Api
    fetch(ctx.requests.getHotels)
      .then(res => res.json())
      .then(data => {
        setHotels(data);
      })
      .catch(err => console.log(err));
  }, [ctx.requests.getHotels]);

  // lưu value input vào state
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredDesc, setEnteredDesc] = useState('');
  const [enteredPrice, setEnteredPrice] = useState('');
  const [enteredMaxPeople, setEnteredMaxPeople] = useState('');
  const [enteredRooms, setEnteredRooms] = useState([]);
  const [enteredHotelId, setEnteredHotelId] = useState('');

  // state validate
  const [notValidRooms, setNotValidRooms] = useState(false);
  const [notValidHotelId, setNotValidHotelId] = useState(false);

  // handlers
  const titleChangeHandler = e => setEnteredTitle(e.target.value);
  const descChangeHandler = e => setEnteredDesc(e.target.value);
  const priceChangeHandler = e => setEnteredPrice(e.target.value);
  const maxPeopleChangeHandler = e => setEnteredMaxPeople(+e.target.value);
  const roomsChangeHandler = e => {
    setEnteredRooms(e.target.value);
    setNotValidRooms(false);
  };
  const hotelIdChangeHandler = e => {
    setEnteredHotelId(e.target.value);
    setNotValidHotelId(false);
  };

  // dùng useRef() để lấy value input dùng focus()
  const titleInputRef = useRef();
  const descInputRef = useRef();
  const priceInputRef = useRef();
  const maxPeopleInputRef = useRef();

  // Fetch data input khi editing
  const urlFetch = `${ctx.requests.getRooms}/${params.roomId}`;
  useEffect(() => {
    if (editing) {
      // fetch by id
      fetch(urlFetch)
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          setEnteredTitle(data.title);
          setEnteredDesc(data.desc);
          setEnteredPrice(data.price);
          setEnteredMaxPeople(data.maxPeople);
          setEnteredRooms(data.roomNumbers.map(room => room.number).toString()); // chuyển arr thành dạng text
          setEnteredHotelId(data.hotelId);
        })
        .catch(err => console.log(err));
    } else {
      setEnteredTitle('');
      setEnteredDesc('');
      setEnteredPrice('');
      setEnteredMaxPeople('');
      setEnteredRooms([]);
      setEnteredHotelId('');
    }
  }, [editing, urlFetch]);

  // xử lý submit
  const submitHandler = e => {
    e.preventDefault();

    // Validate dữ liệu
    if (enteredTitle === '') {
      titleInputRef.current.focus();
      return;
    } else if (enteredDesc === '') {
      descInputRef.current.focus();
      return;
    } else if (enteredPrice === '') {
      priceInputRef.current.focus();
      return;
    } else if (enteredMaxPeople === '') {
      maxPeopleInputRef.current.focus();
      return;
    } else if (enteredRooms.length === 0) {
      setNotValidRooms(true);
      return;
    } else if (enteredHotelId === '') {
      setNotValidHotelId(true);
      return;
    }

    // xóa dấu phẩy giữa các giá trị và tạo dạng arr
    const roomNumbers = enteredRooms.split(',').map(room => ({ number: room }));
    const newRoom = {
      title: enteredTitle,
      desc: enteredDesc,
      price: enteredPrice,
      maxPeople: enteredMaxPeople,
      roomNumbers: roomNumbers,
      hotelId: enteredHotelId,
    };

    // console.log(newRoom);

    if (editing) {
      // post update Room
      fetch(ctx.requests.postEditRoom, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ _id: params.roomId, ...newRoom }),
      })
        .then(res => {
          if (res.ok) {
            // toast
            dispatch(toastActions.SHOW_SUCCESS(res.statusText));
          } else {
            dispatch(toastActions.SHOW_WARN(res.statusText));
          }
        })
        .catch(err => console.log(err));
    } else {
      // post new room Api
      fetch(ctx.requests.postNewRoom, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newRoom),
      })
        .then(res => {
          if (res.ok) {
            // toast
            dispatch(toastActions.SHOW_SUCCESS('Create Room successfully!'));
          }
        })
        .catch(err => console.log(err));
    }

    navigate('/rooms');
  };

  return (
    <Layout className="new">
      <div className="top">
        <h1>{editing ? 'Update' : 'Add New'} Room</h1>
      </div>
      <div className="bottom">
        <form onSubmit={submitHandler}>
          <div className="formInput">
            <label>Title</label>
            <input
              id="title"
              type="text"
              placeholder="2 bed room"
              value={enteredTitle}
              onChange={titleChangeHandler}
              ref={titleInputRef}
            />
          </div>
          <div className="formInput">
            <label>Description</label>
            <input
              id="desc"
              type="text"
              placeholder="King size bed, 1 bathroom"
              value={enteredDesc}
              onChange={descChangeHandler}
              ref={descInputRef}
            />
          </div>
          <div className="formInput">
            <label>Price</label>
            <input
              id="price"
              type="number"
              placeholder="100"
              value={enteredPrice}
              onChange={priceChangeHandler}
              ref={priceInputRef}
            />
          </div>
          <div className="formInput">
            <label>Max People</label>
            <input
              id="maxPeople"
              type="number"
              placeholder="2"
              value={enteredMaxPeople}
              onChange={maxPeopleChangeHandler}
              ref={maxPeopleInputRef}
            />
          </div>
          <div className="formInput">
            <label>Rooms</label>
            <textarea
              className={`${notValidRooms ? 'notValidRooms' : ''} ${
                editing ? 'editingRooms' : ''
              }`}
              placeholder="give comma between room numbers."
              value={enteredRooms}
              onChange={roomsChangeHandler}
            />
          </div>
          {!editing && (
            <div className="formInput">
              <label>Choose a hotel</label>
              <select
                id="hotelId"
                className={notValidHotelId ? 'notValidHotelId' : ''}
                value={enteredHotelId}
                onChange={hotelIdChangeHandler}
              >
                <option value="">Choose a hotel:</option>
                {hotels.map(hotel => (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {editing ? (
            <button className="editBtn">Update</button>
          ) : (
            <button>Send</button>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default NewRoom;
