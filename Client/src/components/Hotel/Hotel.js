import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './Hotel.css';
import HeaderPage from 'components/UI/HeaderPage/HeaderPage';
import LoadingSpinner from 'components/UI/LoadingSpinner/LoadingSpinner';
import HotelDetail from './HotelDetail';
import ApiContext from 'context/ApiContext';

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  // const id = location.pathname.slice(8)

  const [dataFetch, setDataFetch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const apiCtx = useContext(ApiContext);

  const urlFetch = `${apiCtx.requests.getHotel}/${id}`;

  // fetch data home page
  useEffect(() => {
    // get data
    setLoading(true);
    setError(false);
    fetch(urlFetch)
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          setError(false);
        }
        return res.json();
      })
      .then(data => {
        // console.log(data);
        setLoading(false);
        if (data !== null) {
          setDataFetch(data);
        } else {
          setError(true);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, [urlFetch]);
  return (
    <section id="detail">
      <HeaderPage />

      <div className="container">
        {loading && (
          <div className="wrap-detail">
            <LoadingSpinner />
          </div>
        )}
        {!loading && !error && (
          <div className="wrap-detail">
            <HotelDetail item={dataFetch} />
          </div>
        )}
        {!loading && error && <p className="centered">Hotel not Found!</p>}
      </div>
    </section>
  );
};

export default Hotel;
