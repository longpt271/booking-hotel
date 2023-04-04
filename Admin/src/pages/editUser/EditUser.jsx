import { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import './editUser.scss';
import Layout from 'components/layout/Layout';
import ApiContext from 'context/ApiContext';

const EditUser = () => {
  // Sử dụng useContext để lấy data api
  const ctx = useContext(ApiContext);

  const location = useLocation();
  const user = location.state || {};

  // navigate điều hướng
  const navigate = useNavigate();

  //  dùng params lấy id user
  const params = useParams();

  // lưu value input vào state
  const [enteredUsername] = useState(user.username);
  const [enteredEmail] = useState(user.email);
  const [enteredFullName, setEnteredFullName] = useState(user.fullName);
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState(
    user.phoneNumber
  );

  // handlers
  const fullNameChangeHandler = e => setEnteredFullName(e.target.value);
  const phoneNumberChangeHandler = e => setEnteredPhoneNumber(e.target.value);

  // dùng useRef() để lấy value input dùng focus()
  const fullNameInputRef = useRef();
  const phoneNumberInputRef = useRef();

  // Xử lý submit
  const submitHandler = e => {
    e.preventDefault();

    // Validate dữ liệu
    if (enteredFullName === '') {
      fullNameInputRef.current.focus();
      return;
    } else if (enteredPhoneNumber === '') {
      phoneNumberInputRef.current.focus();
      return;
    }

    const editUser = {
      fullName: enteredFullName,
      phoneNumber: +enteredPhoneNumber,
    };

    // console.log(editUser);

    // post update User
    fetch(ctx.requests.postEditUser, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ _id: params.userId, ...editUser }),
    })
      // .then(res => console.log(res))
      .catch(err => console.log(err));

    // move page
    navigate('/user-info');
  };

  return (
    <Layout className="new">
      <div className="top">
        <h1>Update Your Info</h1>
      </div>
      <div className="bottom">
        <form onSubmit={submitHandler}>
          <div className="formInput">
            <label>Username</label>
            <input
              id="username"
              type="text"
              placeholder="Your username"
              value={enteredUsername}
              disabled
            />
          </div>
          <div className="formInput">
            <label>Email</label>
            <input
              id="email"
              type="email"
              placeholder="your email address"
              value={enteredEmail}
              disabled
            />
          </div>
          <div className="formInput">
            <label>Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="Your full name"
              value={enteredFullName}
              onChange={fullNameChangeHandler}
              ref={fullNameInputRef}
            />
          </div>
          <div className="formInput">
            <label>Phone</label>
            <input
              id="phoneNumber"
              type="number"
              placeholder="Your phone number"
              value={enteredPhoneNumber}
              onChange={phoneNumberChangeHandler}
              ref={phoneNumberInputRef}
            />
          </div>
          <Link to="#" className="formInput">
            Change password?
          </Link>
          <button>Update</button>
        </form>
      </div>
    </Layout>
  );
};

export default EditUser;
