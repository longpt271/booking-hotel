import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import './FooterPhoneSubscribe.css';
import { toastActions } from 'store/toast';
import ApiContext from 'context/ApiContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// hàm kiểm tra phone đúng định dạng
function validatePhone(phone) {
  const phoneRegExp = /^(\+84|84|0)(\d){9,10}$/;
  // const phoneRegExp = /^0\d{9}$/;
  return phoneRegExp.test(phone);
}

const FooterPhoneSubscribe = () => {
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
    <form onSubmit={submitHandler} id="footer-phone-subscribe">
      <div className="position-relative w-100">
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-control bg-white border-0 w-100 py-3 ps-4 pe-5"
          placeholder="Your phone"
          value={enteredPhone}
          onChange={PhoneChangeHandler}
          required
        />
        <button
          type="submit"
          className="footer-btn-private btn py-2 position-absolute top-0 end-0 mt-2 me-2"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </form>
  );
};

export default FooterPhoneSubscribe;
