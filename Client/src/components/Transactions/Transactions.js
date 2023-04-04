import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Transactions.css';
import HeaderPage from 'components/UI/HeaderPage/HeaderPage';
import LoadingSpinner from 'components/UI/LoadingSpinner/LoadingSpinner';
import TransactionsList from './TransactionsList';
import TransactionsTable from './TransactionsTable';
import ApiContext from 'context/ApiContext';
import { AuthContext } from 'context/AuthContext';
import { transActions } from 'store/trans';

const Transactions = () => {
  const authCtx = useContext(AuthContext);
  const username = authCtx.user.username;
  const apiCtx = useContext(ApiContext);
  const urlFetch = apiCtx.requests.postTransactionsByUserId;
  // console.log(username, urlFetch);

  // sử dụng redux lưu state trans data
  const dispatch = useDispatch();
  const dataFetch = useSelector(state => state.trans.data);
  const isLoading = useSelector(state => state.trans.isLoading);
  const error = useSelector(state => state.trans.error);

  // fetch data trans
  useEffect(() => {
    // get data
    if (dataFetch.length === 0) {
      dispatch(transActions.setLoading(true));
    }

    dispatch(transActions.setError(null));
    fetch(urlFetch, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username }),
    })
      .then(res => {
        if (!res.ok) {
          dispatch(transActions.setError(true));
        }
        dispatch(transActions.setLoading(false));
        return res.json();
      })
      .then(data => {
        if (data.length !== dataFetch.length) {
          dispatch(transActions.setData(data));
        }
      })
      .catch(err => {
        dispatch(transActions.setError(err.message));
      });
  }, [urlFetch, username, dataFetch.length, dispatch]);

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
    <section id="transactions">
      <HeaderPage />

      <div className="container">
        {isLoading && (
          <div className="wrap-trans">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && !error && dataFetch.length !== 0 && width >= 768 && (
          <div className="wrap-trans">
            <b>Your Transactions</b>
            <TransactionsTable items={dataFetch} />
          </div>
        )}
        {!isLoading && !error && dataFetch.length !== 0 && width < 768 && (
          <div className="wrap-trans">
            <b>Your Transactions</b>
            <TransactionsList items={dataFetch} />
          </div>
        )}
        {!isLoading && !error && dataFetch.length === 0 && (
          <p className="wrap-trans centered">
            Transactions not Found. Booking more :&#93;
          </p>
        )}
        {!isLoading && error && (
          <p className="wrap-trans centered">Failed to Fetch!</p>
        )}
      </div>
    </section>
  );
};

export default Transactions;
