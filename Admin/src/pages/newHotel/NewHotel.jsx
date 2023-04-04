import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import './newHotel.scss';
import Layout from 'components/layout/Layout';
import ApiContext from 'context/ApiContext';
import { useNavigate, useParams } from 'react-router-dom';
import NewHotelRoom from './NewHotelRoom';
import { toastActions } from 'store/toast';

const NewHotel = ({ editing }) => {
  // Sử dụng useContext để lấy data api
  const { requests } = useContext(ApiContext);

  // navigate điều hướng
  const navigate = useNavigate();

  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  //  dùng params lấy id hotel
  const params = useParams();

  // lưu value input vào state
  const [enteredName, setEnteredName] = useState('');
  const [enteredType, setEnteredType] = useState('');
  const [enteredCity, setEnteredCity] = useState('');
  const [enteredAddress, setEnteredAddress] = useState('');
  const [enteredDistance, setEnteredDistance] = useState('');
  const [enteredDesc, setEnteredDesc] = useState('');
  const [enteredPhotos, setEnteredPhotos] = useState('');
  const [enteredFeatured, setEnteredFeatured] = useState(false);
  const [enteredRooms, setEnteredRooms] = useState([]);
  const [enteredPrice, setEnteredPrice] = useState('');

  // state validate
  const [notValidRooms, setNotValidRooms] = useState(false);

  // handlers
  const nameChangeHandler = e => setEnteredName(e.target.value);
  const typeChangeHandler = e => setEnteredType(e.target.value);
  const cityChangeHandler = e => setEnteredCity(e.target.value);
  const addressChangeHandler = e => setEnteredAddress(e.target.value);
  const distanceChangeHandler = e => setEnteredDistance(e.target.value);
  const descChangeHandler = e => setEnteredDesc(e.target.value);
  const photosChangeHandler = e => setEnteredPhotos(e.target.value);
  const featuredChangeHandler = e => setEnteredFeatured(e.target.value);
  const handleSelect = e => {
    const valueSelected = Array.from(
      e.target.selectedOptions,
      option => option.value
    );
    setEnteredRooms(valueSelected);
    setNotValidRooms(false);

    // set price tự động khi select room option
    // nếu chỉ chọn 1 room
    if (valueSelected.length === 1) {
      // fetch ra data của 1 room để lấy price
      fetch(`${requests.getRooms}/${valueSelected[0]}`)
        .then(res => res.json())
        .then(data => {
          // set price tự động từ room
          setEnteredPrice(data.price);
        })
        .catch(err => console.log(err));
    } else {
      let arrPrice = [];
      Promise.all(
        valueSelected.map(value =>
          fetch(`${requests.getRooms}/${value}`)
            .then(res => res.json())
            .then(data => {
              // push tất cả price được select
              arrPrice.push(data.price);
              // Sắp xếp mảng số theo thứ tự tăng dần
              arrPrice.sort(function (a, b) {
                return a - b;
              });
              // set price tự động từ room với giá trị nhỏ nhất
              setEnteredPrice(arrPrice[0]);
            })
            .catch(err => console.log(err))
        )
      );
    }
  };

  // dùng useRef() để lấy value input dùng focus()
  const nameInputRef = useRef();
  const typeInputRef = useRef();
  const cityInputRef = useRef();
  const addressInputRef = useRef();
  const distanceInputRef = useRef();
  const descInputRef = useRef();
  const photosTextareaRef = useRef();

  // Fetch data input khi editing
  const urlFetch = `${requests.getHotel}/${params.hotelId}`;
  useEffect(() => {
    if (editing) {
      // fetch by id
      // get Api
      fetch(urlFetch)
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          setEnteredName(data.name);
          setEnteredType(data.type);
          setEnteredCity(data.city);
          setEnteredAddress(data.address);
          setEnteredDistance(data.distance);
          setEnteredDesc(data.desc);
          setEnteredPhotos(data.photos.toString());
          setEnteredFeatured(data.featured);
          setEnteredRooms(data.rooms.map(room => room._id));
        })
        .catch(err => console.log(err));
    } else {
      setEnteredName('');
      setEnteredType('');
      setEnteredCity('');
      setEnteredAddress('');
      setEnteredDistance('');
      setEnteredDesc('');
      setEnteredPhotos('');
      setEnteredFeatured(false);
      setEnteredRooms('');
    }
  }, [editing, urlFetch]);

  // Xử lý submit
  const submitHandler = e => {
    e.preventDefault();

    // Validate dữ liệu
    if (enteredName === '') {
      nameInputRef.current.focus();
      return;
    } else if (enteredType === '') {
      typeInputRef.current.focus();
      return;
    } else if (enteredCity === '') {
      cityInputRef.current.focus();
      return;
    } else if (enteredAddress === '') {
      addressInputRef.current.focus();
      return;
    } else if (enteredDistance === '') {
      distanceInputRef.current.focus();
      return;
    } else if (enteredDesc === '') {
      descInputRef.current.focus();
      return;
    } else if (enteredPhotos === '') {
      photosTextareaRef.current.focus();
      return;
    } else if (enteredRooms.length === 0) {
      setNotValidRooms(true);
      return;
    }

    const listImage = enteredPhotos.split(',').map(photo => photo);
    const newHotel = {
      name: enteredName,
      type: enteredType,
      city: enteredCity,
      address: enteredAddress,
      distance: enteredDistance,
      desc: enteredDesc,
      photos: listImage,
      featured: enteredFeatured,
      rooms: enteredRooms,
    };

    // console.log(newHotel);

    if (editing) {
      // post update Hotel
      fetch(requests.postEditHotel, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ _id: params.hotelId, ...newHotel }),
      })
        .then(res => {
          // toast
          if (res.ok) {
            dispatch(toastActions.SHOW_SUCCESS('Update Hotel successfully!'));
          }
        })
        .catch(err => console.log(err));
    } else {
      // post new Hotel
      fetch(requests.postNewHotel, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newHotel),
      })
        .then(res => {
          // toast
          if (res.ok) {
            dispatch(toastActions.SHOW_SUCCESS('Create Hotel successfully!'));
          }
        })
        .catch(err => console.log(err));
    }

    // move page
    navigate('/hotels');
  };

  return (
    <Layout className="new">
      <div className="top">
        <h1>{editing ? 'Update' : 'Add New'} Hotel</h1>
      </div>
      <div className="bottom">
        <form onSubmit={submitHandler}>
          <div className="formInput">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="My Hotel"
              value={enteredName}
              onChange={nameChangeHandler}
              ref={nameInputRef}
            />
          </div>
          <div className="formInput">
            <label htmlFor="type">Type</label>
            <input
              id="type"
              type="text"
              placeholder="hotel"
              value={enteredType}
              onChange={typeChangeHandler}
              ref={typeInputRef}
            />
          </div>
          <div className="formInput">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              placeholder="Ninh Binh"
              value={enteredCity}
              onChange={cityChangeHandler}
              ref={cityInputRef}
            />
          </div>
          <div className="formInput">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              placeholder="Ninh Van"
              value={enteredAddress}
              onChange={addressChangeHandler}
              ref={addressInputRef}
            />
          </div>
          <div className="formInput">
            <label htmlFor="distance">Distance from City Center</label>
            <input
              id="distance"
              type="text"
              placeholder="500"
              value={enteredDistance}
              onChange={distanceChangeHandler}
              ref={distanceInputRef}
            />
          </div>
          <div className="formInput">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="The best Hotel"
              value={enteredName}
              disabled
            />
          </div>
          <div className="formInput">
            <label htmlFor="desc">Description</label>
            <input
              id="desc"
              type="text"
              placeholder="description"
              value={enteredDesc}
              onChange={descChangeHandler}
              ref={descInputRef}
            />
          </div>
          <div className="formInput">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              placeholder="100"
              value={enteredPrice}
              disabled
            />
          </div>
          <div className="formInput" style={{ zIndex: 2 }}>
            <label>Images</label>
            <textarea
              className="images"
              value={enteredPhotos}
              onChange={photosChangeHandler}
              ref={photosTextareaRef}
            />
          </div>
          <div className="formInput">
            <label>Featured</label>
            <select
              id="featured"
              value={enteredFeatured}
              onChange={featuredChangeHandler}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <NewHotelRoom
            enteredRooms={enteredRooms}
            handleSelect={handleSelect}
            notValidRooms={notValidRooms}
          />
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

export default NewHotel;
