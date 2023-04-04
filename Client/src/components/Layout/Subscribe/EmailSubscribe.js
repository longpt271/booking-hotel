import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { toastActions } from 'store/toast';
import ApiContext from 'context/ApiContext';

import './EmailSubscribe.css';

const EmailSubscribe = () => {
  // state input email
  const [enteredEmail, setEnteredEmail] = useState('');

  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  const EmailChangeHandler = event => {
    setEnteredEmail(event.target.value);
  };

  const apiCtx = useContext(ApiContext);
  const urlFetch = apiCtx.requests.postSubscribe;

  const submitHandler = event => {
    event.preventDefault();

    // test post Api
    fetch(urlFetch, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email: enteredEmail,
      }),
    })
      .then(res => {
        if (res.ok) {
          dispatch(toastActions.SHOW_SUCCESS('Create Account successfully!'));
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <form
      onSubmit={submitHandler}
      className="input-subscribe"
      id="new-subscribe"
    >
      <div className="d-flex justify-content-center align-items-center">
        <input
          type="email"
          className="subscribe-input__email me-2"
          placeholder="Your Email"
          value={enteredEmail}
          onChange={EmailChangeHandler}
        />
        <button type="submit" className="btn-private btn-subscribe">
          Subscribe
        </button>
      </div>
    </form>
  );
};

export default EmailSubscribe;
