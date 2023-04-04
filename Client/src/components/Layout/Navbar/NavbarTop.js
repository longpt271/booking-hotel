import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faClock,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

import './NavbarTop.css';

function NavbarTop() {
  return (
    <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
      <div className="col-lg-6 px-5 text-start">
        <small>
          <FontAwesomeIcon icon={faLocationDot} className="me-2" />
          Hanoi, Vietnam
        </small>
        <small className="ms-4">
          <FontAwesomeIcon icon={faClock} className="me-2" />
          9.00 am - 9.00 pm
        </small>
      </div>
      <div className="col-lg-6 px-5 text-end">
        <small>
          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
          banoididulichthoii@gmail.com
        </small>
        <small className="ms-4">
          <FontAwesomeIcon icon={faPhone} className="me-2" />
          0976622288
        </small>
      </div>
    </div>
  );
}

export default NavbarTop;
