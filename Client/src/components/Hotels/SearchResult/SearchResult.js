import React, { useContext, useEffect, useState } from 'react';

import SearchResultItem from './SearchResultItem';
import { SearchContext } from 'context/SearchContext';
import ApiContext from 'context/ApiContext';
import LoadingSpinner from 'components/UI/LoadingSpinner/LoadingSpinner';

const SearchResult = () => {
  const ctx = useContext(SearchContext);
  const { city, minPrice, maxPrice, dates, options } = ctx;
  const { requests } = useContext(ApiContext);
  const allDates = dates[0].allDates;

  // xử lý query
  const limit = 'limit=4'; // limit trả về 4 hotels đầu tiên
  const cityQuery = city ? `&city=${city}` : '';
  const minPriceQuery = minPrice ? `&min=${minPrice}` : '';
  const maxPriceQuery = maxPrice ? `&max=${maxPrice}` : '';
  const queryUrl = `${limit}${cityQuery}${minPriceQuery}${maxPriceQuery}`;

  const urlFetch = `${requests.postSearchHotels}?${queryUrl}`;
  // console.log(urlFetch);

  // state lưu data fetch
  const [DataFetch, setDataFetch] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch data home page
  useEffect(() => {
    // get data
    setLoading(true);
    fetch(urlFetch, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ allDates, options }),
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setLoading(false);
        setDataFetch(data);
      })
      .catch(err => console.log(err));

    // tự động scroll về đầu trang
    window.scrollTo(0, 0);
  }, [urlFetch, allDates, options]);

  return (
    <>
      {loading && <LoadingSpinner />}

      {!loading &&
        DataFetch.length !== 0 &&
        DataFetch.map(item => <SearchResultItem key={item._id} item={item} />)}

      {!loading && DataFetch.length === 0 && (
        <p className="centered">Không tìm thấy khách sạn nào!</p>
      )}
    </>
  );
};

export default SearchResult;
