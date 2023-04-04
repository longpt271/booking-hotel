import React from 'react';

// Tạo biến với định dạng tương ứng
const ApiContext = React.createContext({
  TOKEN: '',
  requests: {},
});

export const ApiContextProvider = props => {
  // data API
  const TOKEN = 'RYoOcWM4JW'; // Token API
  const urlApi = 'https://booking-server-30cfsmt9w-longpt2022.vercel.app/api';
  const requestsUrl = {
    postRegister: `${urlApi}/auth/register`,
    postLogin: `${urlApi}/auth/login`,
    getUsers: `${urlApi}/users`,
    postEditUser: `${urlApi}/users/edit`,
    getHotels: `${urlApi}/hotels`,
    getHotel: `${urlApi}/hotels/find`,
    postNewHotel: `${urlApi}/hotels/new`,
    postEditHotel: `${urlApi}/hotels/edit`,
    deleteHotel: `${urlApi}/hotels/delete`,
    getRooms: `${urlApi}/rooms`,
    postNewRoom: `${urlApi}/rooms/new`,
    postEditRoom: `${urlApi}/rooms/edit`,
    deleteRoom: `${urlApi}/rooms/delete`,
    getTransactions: `${urlApi}/transactions`,
    getLast8Transactions: `${urlApi}/transactions/last8trans`,
    postTransactionsByUserId: `${urlApi}/transactions/findByUserId`,
    postEditStatusTransaction: `${urlApi}/transactions/editStatus`,
    getDashboard: `${urlApi}/dashboard`,
  };

  return (
    <ApiContext.Provider
      // Value trả về khi ở child dùng useContext()
      value={{
        TOKEN: TOKEN,
        requests: requestsUrl,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
