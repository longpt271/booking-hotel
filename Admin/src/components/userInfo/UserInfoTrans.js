import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from 'context/AuthContext';
import ApiContext from 'context/ApiContext';
import DataTable from 'components/dataTable/DataTable';
import columnSources from 'components/dataTable/columnSources';

const UserInfoTrans = () => {
  const authCtx = useContext(AuthContext);
  const username = authCtx.user.username;
  const apiCtx = useContext(ApiContext);
  const urlFetch = apiCtx.requests.postTransactionsByUserId;
  // console.log(username, urlFetch);

  const [DataFetch, setDataFetch] = useState([]);

  // fetch data trans
  useEffect(() => {
    // get data

    fetch(urlFetch, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username }),
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setDataFetch(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [urlFetch, username]);
  return (
    <DataTable
      rows={DataFetch}
      columns={columnSources.trans.concat(columnSources.tranStatus)}
    />
  );
};

export default UserInfoTrans;
