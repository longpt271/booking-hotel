import SearchBar from 'components/Home/SearchBar/SearchBar';

import './banner.css';

const Banner = () => {
  return (
    <div className="home-banner">
      <div className="banner-item pb-4">
        <img className="w-100" src="/images/banner_0.png" alt="banner" />

        <div className="banner-caption">
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-lg-8 banner-content">
                <p className="d-inline-block border border-white py-1 px-3 slideInDown">
                  Travel Agent
                </p>
                <h2 className="fw-bold mb-4 d-none d-lg-block">
                  Du lịch Nội địa & Quốc tế
                </h2>
              </div>
            </div>
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
