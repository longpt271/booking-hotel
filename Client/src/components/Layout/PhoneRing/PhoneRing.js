import React from 'react';

import './phoneRing.css';

const PhoneRing = () => {
  return (
    <div className="hotline-phone-ring-wrap">
      <div className="hotline-phone-ring">
        <div className="hotline-phone-ring-circle"></div>
        <div className="hotline-phone-ring-circle-fill"></div>
        <div className="hotline-phone-ring-img-circle">
          <a href="tel:0976622288" className="pps-btn-img">
            <img
              src="https://nguyenhung.net/wp-content/uploads/2019/05/icon-call-nh.png"
              alt="Gọi điện thoại"
              width="50"
            />
          </a>
        </div>
      </div>
      <div className="hotline-bar">
        <a href="tel:0976622288">
          <span className="text-hotline">0976622288</span>
        </a>
      </div>
    </div>
  );
};

export default PhoneRing;
