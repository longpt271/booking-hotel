import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './reserve.css';
import { AuthContext } from 'context/AuthContext';
import { SearchContext } from 'context/SearchContext';
import ApiContext from 'context/ApiContext';
import ReserveDates from './reserveDates/ReserveDates';
import ReserveInfo from './reserveInfo/ReserveInfo';
import ReserveRoom from './reserveRoom/reserveRoom';
import { toastActions } from 'store/toast';

// Đổi định dạng ngày (day/month/year)
const formatDate = date => {
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const month =
    date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; // Vì getMonth() từ 0 - 11
  const year = date.getFullYear();

  // console.log(day + '/' + month + '/' + year);
  return day + '/' + month + '/' + year;
};

const Reserve = ({ data }) => {
  const dataFetch = data || [];
  // console.log(dataFetch);

  const apiCtx = useContext(ApiContext);
  const { user } = useContext(AuthContext);
  const { dates } = useContext(SearchContext);

  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // states lưu data form
  const [info, setInfo] = useState({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    cardNumber: '',
  });
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [enteredPayment, setEnteredPayment] = useState('');
  const [isNotCreditCard, setIsNotCreditCard] = useState(true);

  // hàm xử lý data form change
  const handleChangeInfo = e => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleChangePayment = e => setEnteredPayment(e.target.value);

  // ẩn hiện credit card when change payment
  useEffect(() => {
    // console.log(enteredPayment);
    if (enteredPayment !== 'Credit Card') {
      setIsNotCreditCard(true);
    } else {
      setIsNotCreditCard(false);
    }
  }, [enteredPayment]);

  // timestamp range startDate to endDate của các ngày được chọn  để kiểm tra ngày đặt phòng dễ hơn
  const allDates = dates[0].allDates;
  // console.log(dates[0].startDate, dates[0].endDate);
  // console.log(allDates);

  // Hàm kiểm tra room checkbox đã có ai đặt trong ngày đó chưa
  const isAvailable = roomNumber => {
    // some() kiểm tra xem ít nhất một phần tử trong mảng
    // nếu trùng với điều kiện trả về true
    const isFound = roomNumber.unavailableDates.some(date =>
      allDates.includes(new Date(date).getTime())
    );

    // trả về false
    return !isFound;
  };

  // tạo mảng các id, rooms, price đã select
  const selectedRoomIds = selectedRooms.map(room => room._id);
  // const selectedRoomNumbers = selectedRooms.map(room => room.roomNumber);
  const roomPrices = selectedRooms.map(room => room.price);

  // tính tổng price room đã select
  const sumRoomPrice = roomPrices.reduce((partialSum, a) => partialSum + a, 0);

  // số ngày qua đêm của khách
  // nếu chỉ đặt trong ngày giảm 50% (0.5)
  const dayBooked = dates[0].dayDiff === 0 ? 0.5 : dates[0].dayDiff;

  // Tổng bill
  const totalBill = sumRoomPrice * dayBooked;

  // Xử lý ấn submit
  const submitHandler = async e => {
    e.preventDefault();

    if (info.fullName === '') {
      dispatch(toastActions.SHOW_WARN('Please enter your Full Name!'));
      return;
    } else if (info.email === '') {
      dispatch(toastActions.SHOW_WARN('Please enter your Email!'));
      return;
    } else if (info.phoneNumber === '') {
      dispatch(toastActions.SHOW_WARN('Please enter your Phone Number!'));
      return;
    } else if (enteredPayment === 'Credit Card') {
      if (info.cardNumber === '') {
        dispatch(toastActions.SHOW_WARN('Please enter your Card Number!'));
        return;
      }
    }

    const enteredData = {
      user: user.username,
      hotel: dataFetch._id,
      room: selectedRooms,
      dateStart: formatDate(dates[0].startDate),
      dateEnd: formatDate(dates[0].endDate),
      price: totalBill,
      payment: enteredPayment,
      userInfo: {
        fullName: info.fullName,
        email: info.email,
        phoneNumber: info.phoneNumber,
        cardNumber: info.cardNumber,
      },
    };
    // console.log(enteredData);

    // post new transaction
    fetch(apiCtx.requests.postNewTransaction, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(enteredData),
    })
      .then(async res => {
        if (res.ok) {
          const urlFetchRoomNumber = apiCtx.requests.postEditRoomNumberDate;
          // sau khi reserve thành công
          // cập nhật dates mà room number đã được đặt
          try {
            await Promise.all(
              selectedRoomIds.map(async roomId => {
                const res = await fetch(urlFetchRoomNumber, {
                  method: 'POST',
                  headers: { 'Content-type': 'application/json' },
                  body: JSON.stringify({ id: roomId, dates: allDates }),
                });

                const data = await res.json();

                return data;
              })
            );

            // điều hướng
            navigate('/transactions');
          } catch (err) {}

          dispatch(toastActions.SHOW_SUCCESS('Booking successfully!'));
        } else {
          dispatch(toastActions.SHOW_WARN(res.statusText));
        }

        return res.json();
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  return (
    <div className="reserve">
      <form onSubmit={submitHandler}>
        <div className="rContainer">
          <ReserveDates />
          <ReserveInfo
            info={info}
            handleChangeInfo={handleChangeInfo}
            isNotCreditCard={isNotCreditCard}
          />
        </div>

        <b>Select your rooms:</b>
        <ReserveRoom
          dataFetch={dataFetch}
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
          isAvailable={isAvailable}
        />

        <b>Total Bill: {totalBill}</b>
        <div className="rTotal">
          <select value={enteredPayment} onChange={handleChangePayment}>
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
          <div className="wrapRBtn">
            <button className="btn-private rButton">Reserve Now!</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reserve;
