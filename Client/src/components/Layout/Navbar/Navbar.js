import React, { useState, useEffect } from 'react';

import './Navbar.css';
import NavbarTop from './NavbarTop';
import NavbarBot from './NavbarBot';

function Navbar() {
  // Kiểm tra xem có đang ở top màn hình không
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    function handleScroll() {
      setIsTop(window.pageYOffset === 0);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // check độ rộng màn hình website (chattGPT =))
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div
      className={`fixed-top container-fluid px-0 wow fadeIn ${
        !isTop ? 'bg-light shadow' : ''
      }`}
      style={{ top: width < 992 ? 0 : isTop ? 0 : -30 }}
    >
      <NavbarTop />
      <NavbarBot />
    </div>
  );
}

export default Navbar;
