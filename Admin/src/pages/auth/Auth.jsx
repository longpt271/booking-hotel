import { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ApiContext from 'context/ApiContext';

import './auth.scss';
import { AuthContext } from 'context/AuthContext';
import { toastActions } from 'store/toast';

const Auth = () => {
  // Sử dụng context lấy dữ liệu
  const ctx = useContext(ApiContext);
  const authCtx = useContext(AuthContext);

  // lấy path từ location
  const location = useLocation();
  const isRegistering = location.pathname === '/auth/register';

  // điều hướng
  const navigate = useNavigate();

  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  // states
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [errMessRegister, setErrMessRegister] = useState('');

  const emailChangeHandler = e => setEnteredEmail(e.target.value);
  const usernameChangeHandler = e => setEnteredUsername(e.target.value);
  const passwordChangeHandler = e => setEnteredPassword(e.target.value);

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  // xử lý submit
  const registerHandler = e => {
    e.preventDefault();

    // Validate dữ liệu
    if (!enteredEmail.includes('@')) {
      emailInputRef.current.focus();
      return;
    } else if (enteredUsername === '') {
      usernameInputRef.current.focus();
      return;
    } else if (enteredPassword === '') {
      passwordInputRef.current.focus();
      return;
    }

    const userData = {
      username: enteredUsername,
      password: enteredPassword,
      email: enteredEmail,
    };

    // Khi register
    // post new User
    fetch(ctx.requests.postRegister, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        // nếu có mess thông báo lỗi
        if (data.warnMessage) {
          setErrMessRegister(data.warnMessage);
        } else {
          // nếu k có thông báo lỗi
          setErrMessRegister('');
          dispatch(toastActions.SHOW_SUCCESS('Create Account successfully!'));

          navigate('/auth');
        }
      })
      .catch(err => console.log(err));
  };

  // Xử lý login
  const loginHandler = e => {
    e.preventDefault();

    // Validate dữ liệu
    if (enteredUsername === '') {
      usernameInputRef.current.focus();
      return;
    } else if (enteredPassword === '') {
      passwordInputRef.current.focus();
      return;
    }

    const userData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    // bắt đầu fetch (loading)
    authCtx.dispatch({ type: 'LOGIN_START' });

    // fetch
    fetch(ctx.requests.postLogin, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        // nếu có mess thông báo lỗi
        if (data.warnMessage) {
          authCtx.dispatch({
            type: 'LOGIN_FAILURE',
            payload: { message: data.warnMessage },
          });
          // nếu k có thông báo lỗi
        } else {
          // nếu là admin
          if (data.isAdmin) {
            authCtx.dispatch({ type: 'LOGIN_SUCCESS', payload: data.details });
            dispatch(toastActions.SHOW_SUCCESS('Login successfully!'));

            navigate('/');
          } else {
            // nếu k là admin
            authCtx.dispatch({
              type: 'LOGIN_FAILURE',
              payload: { message: 'You are not Amin!' },
            });
          }
        }
      })
      .catch(err => {
        console.error(err);
        authCtx.dispatch({ type: 'LOGIN_FAILURE', payload: err });
      });
  };

  return (
    <main>
      <div className="navbarAuth">
        <div className="logo" onClick={() => navigate('#')}>
          Admin Page
        </div>
        <div className="action">
          <button onClick={() => navigate('/auth/register')}>Sign up</button>
          <button onClick={() => navigate('/auth')}>Login</button>
        </div>
      </div>
      <div className="login">
        <form className="lContainer">
          <h1>{isRegistering ? 'Sign Up' : 'Login'}</h1>
          {isRegistering && (
            <input
              type="email"
              placeholder="email"
              id="email"
              className="lInput"
              value={enteredEmail}
              onChange={emailChangeHandler}
              ref={emailInputRef}
            />
          )}
          <input
            type="text"
            placeholder="username"
            id="username"
            className="lInput"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            ref={usernameInputRef}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="lInput"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            ref={passwordInputRef}
          />

          {isRegistering && (
            <>
              <button className="lButton" onClick={registerHandler}>
                Create Account
              </button>
              {errMessRegister && <span>{errMessRegister}</span>}
            </>
          )}

          {!isRegistering && (
            <>
              <button
                disabled={authCtx.loading}
                className="lButton"
                onClick={loginHandler}
              >
                Login
              </button>
              {authCtx.error && <span>{authCtx.error.message}</span>}
            </>
          )}
        </form>
      </div>
    </main>
  );
};

export default Auth;
