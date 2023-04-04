import React from 'react';

// Tạo biến với định dạng tương ứng
const ApiContext = React.createContext({
  requests: {},
});

export const ApiContextProvider = props => {
  // data API
  const urlApi = 'https://booking-server-30cfsmt9w-longpt2022.vercel.app/api';
  const requestsUrl = {
    postRegisterApi: `${urlApi}/auth/register`,
    postLoginApi: `${urlApi}/auth/login`,
    postEditUser: `${urlApi}/users/edit`,
    getHomeData: `${urlApi}/hotels/homeData`,
    getHotels: `${urlApi}/hotels`,
    getHotel: `${urlApi}/hotels/find`,
    getHotelRoom: `${urlApi}/hotels/find/room`,
    postSearchHotels: `${urlApi}/hotels/search`,
    postEditRoomNumberDate: `${urlApi}/rooms/editRoomNumberDate`,
    postNewTransaction: `${urlApi}/transactions/new`,
    postTransactionsByUserId: `${urlApi}/transactions/findByUserId`,
    postEmailSubscribe: `${urlApi}/subscribe/email`,
    postPhoneSubscribe: `${urlApi}/subscribe/phone`,
  };

  return (
    <ApiContext.Provider
      // Value trả về khi ở child dùng useContext()
      value={{
        requests: requestsUrl,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
