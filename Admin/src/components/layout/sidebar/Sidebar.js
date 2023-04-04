import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import './sidebar.scss';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useDispatch } from 'react-redux';

// import confirm modal
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { toastActions } from 'store/toast';

const Sidebar = () => {
  // Sử dụng context lấy dữ liệu
  const authCtx = useContext(AuthContext);

  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handlerLogout = () => {
    confirmAlert({
      message: 'Confirm to logout',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            authCtx.dispatch({ type: 'LOGOUT' });
            navigate('/auth');

            // alert
            dispatch(toastActions.SHOW_SUCCESS('Logout!'));
          },
        },
        {
          label: 'No',
          onClick: () => dispatch(toastActions.SHOW_WARN('cancelled!')),
        },
      ],
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <Link to="/">
          <span className="logo">Admin Page</span>
        </Link>
      </div>
      <hr />
      <div className="sidebar-center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/">
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">LISTS</p>
          <Link to="/users">
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/hotels">
            <li>
              <StoreIcon className="icon" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to="/rooms">
            <li>
              <CreditCardIcon className="icon" />
              <span>Rooms</span>
            </li>
          </Link>
          <Link to="/transactions">
            <li>
              <LocalShippingIcon className="icon" />
              <span>Transactions</span>
            </li>
          </Link>

          <p className="title">NEW</p>
          <Link to="/hotels/new">
            <li>
              <StoreIcon className="icon" />
              <span>New Hotel</span>
            </li>
          </Link>
          <Link to="/rooms/new">
            <li>
              <CreditCardIcon className="icon" />
              <span>New Room</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <li onClick={handlerLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
