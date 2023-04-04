import { createContext, useReducer } from 'react';

const today = new Date();
// setHours(hoursValue, minutesValue, secondsValue, msValue)
today.setHours(7, 0, 0, 0);
// console.log(today.getTime());

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
// Hàm tính khoảng cách giữa 2 ngày
function dayDifference(date1, date2) {
  const timeDiff = Math.abs(date1.getTime() - date2.getTime());
  const dayDiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return dayDiff;
}

// Hàm tính range timestamp của các ngày được chọn
const getDatesInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  // console.log(start, end);

  const date = new Date(start.getTime());

  const dates = [];

  // Tạo vòng lặp push từng ngày vào mảng dates
  // cho đến khi date start = date end
  while (date <= end) {
    dates.push(new Date(date).getTime());
    // tăng đến ngày tiếp theo
    date.setDate(date.getDate() + 1);
  }

  // trả về timestamp của tất cả các ngày đã được chọn
  return dates;
};

const INITIAL_STATE = {
  city: '',
  dates: [
    {
      startDate: today,
      endDate: today,
      key: 'selection',
      dayDiff: 0,
      allDates: [],
    },
  ],
  minPrice: undefined,
  maxPrice: undefined,
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_START':
      const actionPayload = action.payload;

      // set lại dates nhận vào về 0h
      actionPayload.dates[0].startDate.setHours(7, 0, 0, 0);
      actionPayload.dates[0].endDate.setHours(7, 0, 0, 0);

      // console.log(actionPayload);

      return actionPayload;
    case 'SEARCH_END':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  // sửa dayDiff khi state thay đổi vào dates
  state.dates[0].dayDiff = dayDifference(
    state.dates[0].startDate,
    state.dates[0].endDate
  );

  // sửa allDates khi state thay đổi vào dates
  state.dates[0].allDates = getDatesInRange(
    state.dates[0].startDate,
    state.dates[0].endDate
  );
  // console.log(state);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        minPrice: state.minPrice,
        maxPrice: state.maxPrice,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
