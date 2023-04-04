import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faCalendarDays,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import './SearchBar.css';
import { SearchContext } from 'context/SearchContext';

const SearchBar = () => {
  const searchCtx = useContext(SearchContext);
  const navigate = useNavigate();

  const [destination, setDestination] = useState(searchCtx.city);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState(searchCtx.dates);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState(searchCtx.options);

  const handleOption = (name, operation) => {
    setOptions(prev => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    // dispatch lưu state vào context
    searchCtx.dispatch({
      type: 'SEARCH_START',
      payload: { city: destination, dates, options },
    });

    // điều hướng sang page hotels
    navigate('/hotels');
    // truyền theo state về location state
    // navigate('/hotels', { state: { destination, dates, options } });
  };

  return (
    <div id="search-bar" className="move-bottom headerSearch mb-5">
      <div className="headerSearchItem searchBarCity">
        <FontAwesomeIcon icon={faBed} className="headerIcon" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="headerSearchInput"
          value={destination}
          onChange={e => setDestination(e.target.value)}
        />
      </div>
      <div className="headerSearchItem searchBarDate">
        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
        <span
          onClick={() => setOpenDate(!openDate)}
          className="headerSearchText"
        >{`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(
          dates[0].endDate,
          'MM/dd/yyyy'
        )}`}</span>
        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={item => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            className="date"
            minDate={new Date()}
          />
        )}
      </div>
      <div className="headerSearchItem searchBarOption">
        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
        <span
          onClick={() => setOpenOptions(!openOptions)}
          className="headerSearchText"
        >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
        {openOptions && (
          <div className="options">
            <div className="optionItem">
              <span className="optionText">Adult</span>
              <div className="optionCounter">
                <button
                  disabled={options.adult <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption('adult', 'd')}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.adult}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption('adult', 'i')}
                >
                  +
                </button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
                <button
                  disabled={options.children <= 0}
                  className="optionCounterButton"
                  onClick={() => handleOption('children', 'd')}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.children}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption('children', 'i')}
                >
                  +
                </button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Room</span>
              <div className="optionCounter">
                <button
                  disabled={options.room <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption('room', 'd')}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.room}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption('room', 'i')}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="headerSearchItem searchBarBtn">
        <button className="btn-private" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
