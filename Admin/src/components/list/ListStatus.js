import { useCallback, useContext, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';

import './dataTable.scss';
import DataTable from 'components/dataTable/DataTable';
import ApiContext from 'context/ApiContext';

const ListStatus = props => {
  const [dataFetch, setDataFetch] = useState([]);
  const [columns] = useState(props.columns || []);
  const [statusColumn, setStatusColumn] = useState([]);

  // Sử dụng useContext để lấy data api
  const ctx = useContext(ApiContext);

  // url Users or Transactions
  const urlFetch =
    props.title === 'Users'
      ? ctx.requests.getUsers
      : ctx.requests.getTransactions;
  // url Edit Status
  const urlEditStatus = ctx.requests.postEditStatusTransaction;

  // func get data Api
  const getData = useCallback(() => {
    fetch(urlFetch)
      .then(res => res.json())
      .then(data => {
        setDataFetch(data);
      })
      .catch(err => console.log(err));
  }, [urlFetch]);

  // hàm xử lý click edit status
  const handleClickStatus = useCallback(
    data => {
      // fetch update status tran
      const fetchStatus = status => {
        // console.log(data._id, status);
        fetch(urlEditStatus, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ _id: data._id, status }),
        })
          .then(res => {
            getData(); // fetch load lại data sau khi xóa
            // alert
            // dispatch(toastActions.SHOW_SUCCESS('Deleted!'));
            return res.json();
          })
          .catch(err => console.log(err));
      };

      confirmAlert({
        message: 'Choose a status',
        buttons: [
          {
            label: 'Booked',
            onClick: () => {
              fetchStatus('Booked');
            },
          },
          {
            label: 'Checkin',
            onClick: () => {
              fetchStatus('Checkin');
            },
          },
          {
            label: 'Checkout',
            onClick: () => {
              fetchStatus('Checkout');
            },
          },
        ],
      });
    },
    [urlEditStatus, getData]
  );

  useEffect(() => {
    //  get data Api
    getData();

    // add column status
    if (props.title === 'Users') {
      setStatusColumn([
        {
          field: 'isAdmin',
          headerName: 'isAdmin',
          width: 150,
          renderCell: params => {
            return (
              <div
                className={`cellWithStatus ${
                  params.row.isAdmin ? 'admin' : 'user'
                }`}
              >
                {params.row.isAdmin ? 'Admin' : 'User'}
              </div>
            );
          },
        },
      ]);
    } else {
      setStatusColumn([
        {
          field: 'status',
          headerName: 'status',
          width: 150,
          renderCell: params => {
            return (
              <div
                className={`cellWithStatus ${params.row.status}`}
                onClick={handleClickStatus.bind(this, params.row)}
              >
                {params.row.status}
              </div>
            );
          },
        },
      ]);
    }
  }, [getData, urlFetch, props.title, handleClickStatus]);

  return (
    <div className="dataTable">
      <div className="dataTableTitle">{props.title} List</div>
      <DataTable rows={dataFetch} columns={columns.concat(statusColumn)} />
    </div>
  );
};

export default ListStatus;
