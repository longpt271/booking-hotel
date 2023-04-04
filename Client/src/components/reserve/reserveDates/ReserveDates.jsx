import { useContext } from 'react';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import './reserveDates.css';
import { SearchContext } from 'context/SearchContext';

const ReserveDates = () => {
  // dùng context
  const { dispatch, dates, ...other } = useContext(SearchContext);

  return (
    <div className="rDates">
      <b>Dates</b>
      <DateRange
        onChange={item => {
          // dispatch lưu state vào context
          dispatch({
            type: 'SEARCH_START',
            payload: { ...other, dates: [item.selection] },
          });
        }}
        minDate={new Date()}
        ranges={dates}
      />
    </div>
  );
};

export default ReserveDates;
