import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartFlatbed,
  faFileInvoice,
  faHouse,
  faStore,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
// import confirm modal
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import './NavbarBot.css';
import { AuthContext } from 'context/AuthContext';
import { toastActions } from 'store/toast';

const NavbarBot = props => {
  const dispatch = useDispatch(); // Dùng useDispatch() cập nhật state redux
  const navigate = useNavigate(); // để chuyển hướng trong ứng dụng.
  const currentPath = useLocation().pathname;
  // lấy ra user từ ctx
  const authCtx = useContext(AuthContext);
  const isAuth = Boolean(authCtx.user);

  // state lưu trạng thái đóng mở navbar
  const [navExpanded, setNavExpanded] = useState(false);

  const handleLogout = () => {
    confirmAlert({
      message: 'Confirm to logout',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            authCtx.dispatch({ type: 'LOGOUT' });

            setNavExpanded(false); // close navbar in mobile view
            dispatch(toastActions.SHOW_SUCCESS('Logout success!')); // thông báo
            navigate('/auth'); // điều hướng
          },
        },
        { label: 'No' },
      ],
    });
  };

  // Tạo button nav active css
  const buttonNav = (path, name, originName) => {
    const isActivePath = currentPath === path ? 'active' : '';

    const navItem = name ? (
      <button className={`${isActivePath} text-capitalize`}>{name}</button>
    ) : (
      <button className={`${isActivePath}`}>{originName}</button>
    );

    return navItem;
  };

  const navUserTitle = isAuth && (
    <span>
      <FontAwesomeIcon icon={faUser} className="navIcon" />
      {buttonNav('/user-info', false, authCtx.user.fullName)}
    </span>
  );

  return (
    <Navbar
      className="NavMain py-3"
      // onToggle={() => setNavExpanded(navExpanded ? false : 'expanded')}
      expanded={navExpanded}
      expand="lg"
    >
      <Container>
        <Navbar.Brand className="logo_abs">
          <Link className="fw-bold text-uppercase text-dark" to="/">
            Banoididulichthoii
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setNavExpanded(navExpanded ? false : 'expanded')}
          onMouseEnter={() => setNavExpanded('expanded')}
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                setNavExpanded(false); // close navbar in mobile view
                navigate('/');
              }}
            >
              <FontAwesomeIcon icon={faHouse} className="navIcon d-lg-none" />
              {buttonNav('/', 'home')}
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setNavExpanded(false); // close navbar in mobile view
                navigate('/hotels');
              }}
            >
              <FontAwesomeIcon icon={faStore} className="navIcon d-lg-none" />
              {buttonNav('/hotels', 'hotels')}
            </Nav.Link>
          </Nav>

          {!isAuth && (
            <Nav>
              <Nav.Link
                onClick={() => {
                  setNavExpanded(false); // close navbar in mobile view
                  navigate('/auth');
                }}
              >
                <FontAwesomeIcon icon={faUser} className="navIcon" />
                {buttonNav('/auth', 'login')}
              </Nav.Link>
            </Nav>
          )}

          {isAuth && (
            <Nav>
              <Nav.Link
                onClick={() => {
                  setNavExpanded(false); // close navbar in mobile view
                  navigate('/cart');
                }}
              >
                <FontAwesomeIcon icon={faCartFlatbed} className="navIcon" />
                {buttonNav('/cart', 'cart')}
              </Nav.Link>

              <Nav.Link
                className="d-block d-lg-none"
                onClick={() => {
                  setNavExpanded(false); // close navbar in mobile view
                  navigate('/transactions');
                }}
              >
                <FontAwesomeIcon icon={faFileInvoice} className="navIcon" />
                {buttonNav('/transactions', 'transactions')}
              </Nav.Link>

              <Nav.Link
                className="d-block d-lg-none"
                onClick={() => {
                  setNavExpanded(false); // close navbar in mobile view
                  navigate('/user-info');
                }}
              >
                {navUserTitle}
              </Nav.Link>

              <Nav.Link className="d-block d-lg-none" onClick={handleLogout}>
                <span className="fw-bold">(Logout)</span>
              </Nav.Link>

              <NavDropdown
                title={navUserTitle}
                align="end"
                id="basic-nav-dropdown"
                className="d-none d-lg-block"
              >
                <NavDropdown.Item
                  onClick={() => {
                    setNavExpanded(false); // close navbar in mobile view
                    navigate('/user-info');
                  }}
                >
                  <span>Info</span>
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    setNavExpanded(false); // close navbar in mobile view
                    navigate('/transactions');
                  }}
                >
                  <span>Transactions</span>
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={handleLogout}>
                  <span>(Logout)</span>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarBot;
