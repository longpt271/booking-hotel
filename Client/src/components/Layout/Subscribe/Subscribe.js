import React from 'react';

import './subscribe.css';
import PhoneSubscribe from './PhoneSubscribe';

const Subscribe = () => {
  return (
    <section id="subscribe">
      <div className="subscribe__hr subscribe__top"></div>
      <div className="container py-1 subscribe__container">
        <h2>Save time, save money!</h2>
        <p>Sign up and we'll send the best deals to you</p>
        <PhoneSubscribe />
      </div>
      <div className="subscribe__hr subscribe__bottom"></div>
    </section>
  );
};

export default Subscribe;
