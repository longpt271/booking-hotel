import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import './userInfo.scss';
import Layout from 'components/layout/Layout';
import ApiContext from 'context/ApiContext';
import { AuthContext } from 'context/AuthContext';
import UserInfoTrans from './UserInfoTrans';

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  const ctx = useContext(ApiContext);

  const navigate = useNavigate();

  const [info, setInfo] = useState({});
  // console.log(info);
  const handleChange = data => {
    setInfo(prev => ({ ...prev, ...data }));
  };

  // Fetch data input khi editing
  const urlFetch = `${ctx.requests.getUsers}/${user._id}`;
  useEffect(() => {
    // fetch by id
    // get Api
    fetch(urlFetch)
      .then(res => res.json())
      .then(data => {
        handleChange(data);
      })
      .catch(err => console.log(err));
  }, [urlFetch]);
  return (
    <Layout className="userInfo">
      <div className="top">
        <div className="left">
          <div
            className="editButton"
            onClick={() => {
              navigate(`/user-info/edit/${user._id}`, { state: info });
            }}
          >
            Edit
          </div>

          <h1 className="title">Information</h1>
          <div className="item">
            <AccountCircleOutlinedIcon className="itemImg" />

            <div className="details">
              <h1 className="itemTitle">{info.fullName || 'User'}</h1>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                <span className="itemValue">{info.email}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Username:</span>
                <span className="itemValue">{info.username}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Phone:</span>
                <span className="itemValue">
                  +84{info.phoneNumber || 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="right"></div> */}
      </div>
      <div className="bottom">
        <h1 className="title">Your Transactions</h1>
        <div className="dataTable">
          <UserInfoTrans />
        </div>
      </div>
    </Layout>
  );
};

export default UserInfo;
