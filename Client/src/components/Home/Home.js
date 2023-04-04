import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './home.css';
import LoadingSpinner from 'components/UI/LoadingSpinner/LoadingSpinner';
import Banner from 'components/Home/Banner/Banner';
import Discover from './Discover/Discover';
import Explore from './Explore/Explore';
// import City from './City/City';
// import Type from './Type/Type';
import Review from './Review/Review';
import Hotel from './Hotel/Hotel';
import Services from './Services/Services';

import ApiContext from 'context/ApiContext';
import { homeActions } from 'store/home';

const Home = () => {
  const apiCtx = useContext(ApiContext);
  const urlFetch = apiCtx.requests.getHomeData;

  // sử dụng redux lưu state home data
  const dispatch = useDispatch();
  const dataFetch = useSelector(state => state.home.data);
  const isLoading = useSelector(state => state.home.isLoading);
  const error = useSelector(state => state.home.error);

  // fetch data home
  useEffect(() => {
    // get data
    if (dataFetch.length === 0) {
      dispatch(homeActions.setLoading(true));
    }

    dispatch(homeActions.setError(null));
    fetch(urlFetch)
      .then(res => {
        if (!res.ok) {
          dispatch(homeActions.setError(true));
        }
        dispatch(homeActions.setLoading(false));
        return res.json();
      })
      .then(data => {
        dispatch(homeActions.setData(data));
      })
      .catch(err => {
        dispatch(homeActions.setError(err.message));
      });
  }, [dataFetch.length, urlFetch, dispatch]);

  return (
    <section id="home">
      <Banner />

      <div className="home-bg-wrap">
        <div className="container pt-3 pb-5">
          <h4 className="home-title">
            Discover The Most <br /> Attractive Places
          </h4>
          <div className="hr mb-0"></div>
          <Discover />
        </div>
      </div>

      <Explore />

      {/* <City data={dataFetch.listCity || []} />
      <div className="container pb-5">
        <h4 className="home-title">Browse by property type</h4>
        <div className="hr"></div>
        <Type data={dataFetch.listType || []} />
      </div> */}

      <div className="home-bg-wrap">
        <div className="container py-5">
          <Review />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="home-bg-wrap">
          <div className="container pb-5">
            <h4 className="home-title">Homes guests love</h4>
            <div className="hr"></div>
            <Hotel data={dataFetch.topRating || []} />
          </div>
        </div>
      )}
      {!isLoading && error && (
        <p className="wrap-trans centered">Failed to Fetch!</p>
      )}
      <div className="home-bg-wrap">
        <div className="container pb-5">
          <h4 className="home-title">Vì sao chọn chúng tôi</h4>
          <div className="hr"></div>
          <Services />
        </div>
      </div>
    </section>
  );
};

export default Home;
