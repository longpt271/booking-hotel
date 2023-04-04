import { useContext, useState } from 'react';

import './userInfo.css';
import HeaderPage from 'components/UI/HeaderPage/HeaderPage';
import ApiContext from 'context/ApiContext';
import { AuthContext } from 'context/AuthContext';
import { useDispatch } from 'react-redux';
import { toastActions } from 'store/toast';

const UserInfo = () => {
  // Sử dụng useContext để lấy data
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const apiCtx = useContext(ApiContext);

  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  // states lưu data form
  const [info, setInfo] = useState({
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    phoneNumber: user.phoneNumber,
  });
  // hàm xử lý data form change
  const handleChangeInfo = e => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Xử lý submit
  const submitHandler = e => {
    e.preventDefault();

    const userEdit = {
      fullName: info.fullName,
      phoneNumber: +info.phoneNumber,
    };

    // console.log(user._id, userEdit);

    // post update User
    fetch(apiCtx.requests.postEditUser, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ _id: user._id, ...userEdit }),
    })
      .then(res => {
        if (res.ok) {
          dispatch(toastActions.SHOW_SUCCESS('Update info successfully!'));
          authCtx.dispatch({ type: 'UPDATE_USER', payload: userEdit });
        } else {
          dispatch(toastActions.SHOW_WARN('Update error!'));
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <section id="userInfo">
      <HeaderPage />

      <div className="container wrap-userInfo">
        <b>Your Info</b>
        <form className="rInfo" onSubmit={submitHandler}>
          <div className="formInput">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Full Name"
              value={info.username}
              disabled
            />
          </div>
          <div className="formInput">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={info.email}
              disabled
            />
          </div>
          <div className="formInput">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="Full Name"
              value={info.fullName}
              onChange={handleChangeInfo}
            />
          </div>
          <div className="formInput">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="number"
              placeholder="Phone Number"
              value={info.phoneNumber}
              onChange={handleChangeInfo}
            />
          </div>

          <div className="wrapRBtn">
            <button className="btn-private uButton">Update Info!</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserInfo;
