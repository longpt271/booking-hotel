import { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './auth.css';
import ApiContext from 'context/ApiContext';
import { AuthContext } from 'context/AuthContext';
import { toastActions } from 'store/toast';

const Auth = () => {
  // Sử dụng context lấy dữ liệu
  const authCtx = useContext(AuthContext);
  const apiCtx = useContext(ApiContext);

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
  const [isFetchingRegister, setIsFetchingRegister] = useState(false);

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
    setIsFetchingRegister(true);
    // post new User
    fetch(apiCtx.requests.postRegisterApi, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(res => {
        setIsFetchingRegister(false);
        return res.json();
      })
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
    fetch(apiCtx.requests.postLoginApi, {
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
        } else {
          // nếu k có thông báo lỗi -> đăng nhập thành công
          // lưu lại user info vào ctx và chuyển hướng
          authCtx.dispatch({ type: 'LOGIN_SUCCESS', payload: data.details });

          dispatch(toastActions.SHOW_SUCCESS('Login successfully!'));
          navigate('/');
        }
      })
      .catch(err => {
        console.error(err);
        authCtx.dispatch({ type: 'LOGIN_FAILURE', payload: err });
      });
  };

  return (
    <section className="login">
      <img src="/images/banner_.png" alt="banner" />

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
            <button className="btn-private lButton" onClick={registerHandler}>
              {isFetchingRegister ? '...' : 'Create Account'}
            </button>
            {errMessRegister && <span>{errMessRegister}</span>}
          </>
        )}

        {!isRegistering && (
          <>
            <button
              disabled={authCtx.loading}
              className="btn-private lButton"
              onClick={loginHandler}
            >
              {authCtx.loading ? '...' : 'Login'}
            </button>
            {authCtx.error && <span>{authCtx.error.message}</span>}
          </>
        )}

        {isRegistering ? (
          <div className="auth_toggle">
            <span>Login?</span>
            <button type="button" onClick={() => navigate('/auth')}>
              Click
            </button>
          </div>
        ) : (
          <div className="auth_toggle">
            <span>Create an account?</span>
            <button type="button" onClick={() => navigate('/auth/register')}>
              Sign up
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default Auth;
