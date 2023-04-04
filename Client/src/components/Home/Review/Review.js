import React from 'react';

import './Review.css';

const Review = props => {
  return (
    <section className="review">
      <div className="content" data-aos="fade-right" data-aos-delay="300">
        <span>testimonials</span>
        <h3>good news from our clients</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          laudantium corporis fugiat quae unde perspiciatis similique ab modi
          enim consequatur aperiam cumque distinctio facilis sit, debitis
          possimus asperiores non harum.
        </p>
      </div>

      <div className="box-container" data-aos="fade-left" data-aos-delay="600">
        <div className="box">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
            ratione.
          </p>
          <div className="user">
            <img src="/images/pic-1.png" alt="" />
            <div className="info">
              <h3>john deo</h3>
              <span>Customer</span>
            </div>
          </div>
        </div>
        <div className="box">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
            ratione.
          </p>
          <div className="user">
            <img src="/images/pic-2.png" alt="" />
            <div className="info">
              <h3>john deo</h3>
              <span>Customer</span>
            </div>
          </div>
        </div>
        <div className="box">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
            ratione.
          </p>
          <div className="user">
            <img src="/images/pic-3.png" alt="" />
            <div className="info">
              <h3>john deo</h3>
              <span>Customer</span>
            </div>
          </div>
        </div>
        <div className="box">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
            ratione.
          </p>
          <div className="user">
            <img src="/images/pic-4.png" alt="" />
            <div className="info">
              <h3>john deo</h3>
              <span>Customer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
