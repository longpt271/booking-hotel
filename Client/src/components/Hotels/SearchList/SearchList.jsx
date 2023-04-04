import { useContext, useState } from 'react';

import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import './SearchList.css';
import { SearchContext } from 'context/SearchContext';

const SearchList = () => {
  // dùng context
  const searchCtx = useContext(SearchContext);

  const [destination, setDestination] = useState(searchCtx.city);
  const [dates, setDates] = useState(searchCtx.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(searchCtx.options);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const destinationChangeHandler = e => setDestination(e.target.value);

  const minPriceChangeHandler = e => setMinPrice(e.target.value);
  const maxPriceChangeHandler = e => setMaxPrice(e.target.value);

  const adultChangeHandler = e => {
    setOptions(prev => ({ ...prev, adult: +e.target.value }));
  };
  const childrenChangeHandler = e => {
    setOptions(prev => ({ ...prev, children: +e.target.value }));
  };
  const roomChangeHandler = e => {
    setOptions(prev => ({ ...prev, room: +e.target.value }));
  };

  // Xử lý submit
  const SearchSubmitHandler = e => {
    e.preventDefault();

    // dispatch lưu state vào context
    searchCtx.dispatch({
      type: 'SEARCH_START',
      payload: { city: destination, dates, minPrice, maxPrice, options },
    });

    // setDestination('');
    // setDates('');
    // setOptions('');
  };

  return (
    <form onSubmit={SearchSubmitHandler}>
      <h1 className="lsTitle">Search</h1>
      <div className="lsItem">
        <label>Destination</label>
        <input
          placeholder={destination}
          type="text"
          value={destination}
          onChange={destinationChangeHandler}
        />
      </div>
      <div className="lsItem">
        <label>Check-in Date</label>
        <span onClick={() => setOpenDate(!openDate)}>{`${format(
          dates[0].startDate,
          'MM/dd/yyyy'
        )} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
        {openDate && (
          <DateRange
            onChange={item => setDates([item.selection])}
            minDate={new Date()}
            ranges={dates}
          />
        )}
      </div>
      <div className="lsItem">
        <label>Options</label>
        <div className="lsOptions">
          <div className="lsOptionItem">
            <span className="lsOptionText">
              Min price <small>per night</small>
            </span>
            <input
              type="number"
              className="lsOptionInput"
              value={minPrice}
              onChange={minPriceChangeHandler}
            />
          </div>
          <div className="lsOptionItem">
            <span className="lsOptionText">
              Max price <small>per night</small>
            </span>
            <input
              type="number"
              className="lsOptionInput"
              value={maxPrice}
              onChange={maxPriceChangeHandler}
            />
          </div>
          <div className="lsOptionItem">
            <span className="lsOptionText">Adult</span>
            <input
              type="number"
              min={1}
              className="lsOptionInput"
              placeholder={options.adult}
              value={options.adult}
              onChange={adultChangeHandler}
            />
          </div>
          <div className="lsOptionItem">
            <span className="lsOptionText">Children</span>
            <input
              type="number"
              min={0}
              className="lsOptionInput"
              placeholder={options.children}
              value={options.children}
              onChange={childrenChangeHandler}
            />
          </div>
          <div className="lsOptionItem">
            <span className="lsOptionText">Room</span>
            <input
              type="number"
              min={1}
              className="lsOptionInput"
              placeholder={options.room}
              value={options.room}
              onChange={roomChangeHandler}
            />
          </div>
        </div>
      </div>
      <button className="btn-private listSearchBtn">Search</button>
    </form>
  );
};

export default SearchList;
