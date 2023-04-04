import { Link } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';

import './dataTable.scss';
import DataTable from 'components/dataTable/DataTable';
import ApiContext from 'context/ApiContext';
import { useDispatch } from 'react-redux';

// import confirm modal
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { toastActions } from 'store/toast';

const ListAction = props => {
  const [dataFetch, setDataFetch] = useState([]);
  const [columns] = useState(props.columns || []);
  const [actionColumn, setActionColumn] = useState([]);

  // Sử dụng useContext để lấy data api
  const ctx = useContext(ApiContext);

  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  // url hotels or Rooms
  const urlFetch =
    props.title === 'Hotels' ? ctx.requests.getHotels : ctx.requests.getRooms;

  // func get data Api
  const getData = useCallback(() => {
    fetch(urlFetch)
      .then(res => res.json())
      .then(data => {
        let dataFinal = data;

        // Thêm fake title vào hotels
        if (props.title === 'Hotels') {
          dataFinal = data.map(hotel => {
            return { ...hotel, title: hotel.name };
          });
        }

        // console.log(dataFinal);
        setDataFetch(dataFinal);
      })
      .catch(err => console.log(err));
  }, [urlFetch, props.title]);

  const urlDelete =
    props.title === 'Hotels'
      ? ctx.requests.deleteHotel
      : ctx.requests.deleteRoom;

  // Xử lý xóa
  const handleDelete = useCallback(
    id => {
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              // fetch delete hotel/Room
              fetch(`${urlDelete}/${id}`, {
                method: 'DELETE',
              })
                .then(res => {
                  if (res.ok) {
                    getData(); // fetch load lại data sau khi xóa
                    dispatch(toastActions.SHOW_SUCCESS(res.statusText));
                  } else {
                    dispatch(toastActions.SHOW_WARN(res.statusText));
                  }
                  return res.json();
                })
                .catch(err => console.log(err));
            },
          },
          {
            label: 'No',
          },
        ],
      });
    },
    [urlDelete, getData, dispatch]
  );

  useEffect(() => {
    // Load data
    getData();

    setActionColumn([
      {
        field: 'action',
        headerName: 'Action',
        width: 150,
        renderCell: params => {
          return (
            <div className="cellAction">
              <Link
                to={`/${props.title.toLowerCase()}/edit/${params.row._id}`}
                className="editButton"
              >
                Edit
              </Link>

              <button
                className="deleteButton"
                onClick={handleDelete.bind(this, params.row._id)}
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ]);
  }, [getData, props.title, handleDelete]);

  return (
    <div className="dataTable">
      <div className="dataTableTitle">
        {props.title} List
        <Link to={`/${props.title.toLowerCase()}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataTable rows={dataFetch} columns={columns.concat(actionColumn)} />
    </div>
  );
};

export default ListAction;
