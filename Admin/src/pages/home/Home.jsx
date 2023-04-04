import { useContext, useEffect, useState } from 'react';
import ApiContext from 'context/ApiContext';

import './home.scss';
import Layout from 'components/layout/Layout';
import Widget from 'components/widget/Widget';
import DataTable from 'components/dataTable/DataTable';
import columnSources from 'components/dataTable/columnSources';

const Home = () => {
  const [dataTrans, setDataTrans] = useState([]);
  const [dataDash, setDataDash] = useState([]);
  // Sử dụng useContext để lấy data api
  const ctx = useContext(ApiContext);

  // url Users or Transactions
  const urlDash = ctx.requests.getDashboard;
  const urlTrans = ctx.requests.getLast8Transactions;

  // func get data Api
  useEffect(() => {
    // fetch data dashboard
    fetch(urlDash)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setDataDash(data);
      })
      .catch(err => console.log(err));

    // fetch data Latest Transactions
    fetch(urlTrans)
      .then(res => res.json())
      .then(data => {
        setDataTrans(data);
      })
      .catch(err => console.log(err));
  }, [urlDash, urlTrans]);

  return (
    <Layout className="home">
      <div className="widgets">
        <Widget type="user" num={dataDash.users} />
        <Widget type="order" num={dataDash.orders} />
        <Widget type="earning" num={dataDash.earnings} />
        <Widget type="balance" num={dataDash.balance} />
      </div>
      <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        <div className="dataTable">
          <DataTable
            rows={dataTrans}
            columns={columnSources.trans.concat(columnSources.tranStatus)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
