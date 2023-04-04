import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import './footer.css';
import Copyright from './Copyright';
import FooterPhoneSubscribe from './FooterPhoneSubscribe';

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer__hr footer__top"></div>

      <div
        className="container-fluid text-light wow fadeIn py-3"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-4 col-md-7 order-3 order-md-1 footer-item-wrap">
              <h4 className="text-white mb-4">Our Office</h4>
              <p className="mb-2">
                <FontAwesomeIcon icon={faLocationDot} className="me-3" />
                Hanoi, Vietnam
              </p>
              <p className="mb-2">
                <FontAwesomeIcon icon={faPhone} className="me-3" />
                0976622288
              </p>
              <p className="mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                banoididulichthoii@gmail.com
              </p>
              <div className="footer-brands pt-2">
                <a
                  className="btn btn-square btn-outline-light rounded-circle"
                  href="https://www.facebook.com/profile.php?id=100085923745569"
                  target="_blank"
                  rel="noReferrer"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a
                  className="btn btn-square btn-outline-light rounded-circle"
                  href="https://www.instagram.com/banoididulichthoii"
                  target="_blank"
                  rel="noReferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <Link
                  className="btn btn-square btn-outline-light rounded-circle"
                  to="/"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
              </div>
            </div>

            <div className="col-lg-4 col-md-5 order-2 order-md-2 d-none d-md-block">
              <h4 className="text-white mb-4">Quick Links</h4>
              <Link className="btn btn-link" to="/">
                <FontAwesomeIcon icon={faAngleRight} className="me-2" />
                About Us
              </Link>
              <Link className="btn btn-link" to="/">
                <FontAwesomeIcon icon={faAngleRight} className="me-2" />
                Contact Us
              </Link>
              <Link className="btn btn-link" to="/">
                <FontAwesomeIcon icon={faAngleRight} className="me-2" />
                Our Services
              </Link>
              <Link className="btn btn-link" to="/">
                <FontAwesomeIcon icon={faAngleRight} className="me-2" />
                Terms & Condition
              </Link>
              <Link className="btn btn-link" to="/">
                <FontAwesomeIcon icon={faAngleRight} className="me-2" />
                Support
              </Link>
            </div>
            <div className="col-lg-4 col-md-6 order-1 order-md-3 footer-item-wrap">
              <h4 className="text-white mb-4">Get in touch</h4>
              <p>Please leave your phone for consultation!</p>
              <FooterPhoneSubscribe />
            </div>
          </div>
        </div>
      </div>

      <Copyright />
    </footer>
  );
};

export default Footer;
