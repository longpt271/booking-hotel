import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { toastActions } from 'store/toast';
import ApiContext from 'context/ApiContext';

import './phoneSubscribe.css';

// hàm kiểm tra phone đúng định dạng
function validatePhone(phone) {
  const phoneRegExp = /^(\+84|84|0)(\d){9,10}$/;
  // const phoneRegExp = /^0\d{9}$/;
  return phoneRegExp.test(phone);
}

const PhoneSubscribe = () => {
  // state input Phone
  const [enteredPhone, setEnteredPhone] = useState('');

  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  const PhoneChangeHandler = event => {
    setEnteredPhone(event.target.value);
  };

  const apiCtx = useContext(ApiContext);
  const urlFetch = apiCtx.requests.postPhoneSubscribe;

  const submitHandler = event => {
    event.preventDefault();
    // console.log(enteredPhone);
    if (validatePhone(enteredPhone)) {
      // test post Api
      fetch(urlFetch, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          phone: enteredPhone,
        }),
      })
        .then(res => {
          if (res.ok) {
            dispatch(
              toastActions.SHOW_SUCCESS(
                'Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất!'
              )
            );
          } else {
            dispatch(
              toastActions.SHOW_WARN(res.statusText || 'Fall to fetch!')
            );
          }
        })
        .catch(err => console.log(err));
    } else {
      dispatch(
        toastActions.SHOW_WARN('Vui lòng nhập đúng định dạng số điện thoại!')
      );
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="input-subscribe"
      id="new-subscribe"
    >
      <div className="d-flex justify-content-center align-items-center">
        <input
          type="tel"
          id="phone"
          name="phone"
          className="subscribe-input__phone me-2"
          placeholder="Your Phone Number"
          value={enteredPhone}
          onChange={PhoneChangeHandler}
          required
        />
        <button type="submit" className="btn-private btn-subscribe">
          Subscribe
        </button>
      </div>
    </form>
  );
};

export default PhoneSubscribe;
