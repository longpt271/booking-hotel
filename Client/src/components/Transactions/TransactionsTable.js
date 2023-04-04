import './TransactionsTable.css';

const TransactionsTable = ({ items = [] }) => {
  return (
    <table className="trans-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Hotel</th>
          <th>Room</th>
          <th>Date</th>
          <th>Price</th>
          <th>Payment Method</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => {
          let rooms = item.room
            .map(r => r.roomNumber)
            .toString()
            .replace(',', ', '); // Thêm khoảng cách sau dấu phẩy

          return (
            <tr key={item._id}>
              <td>{i < 10 ? '0' + (i + 1) : i + 1}</td>
              <td>{item.hotel.name}</td>
              <td>{rooms}</td>
              <td>
                {item.dateStart} - {item.dateEnd}
              </td>
              <td>${item.price}</td>
              <td>{item.payment}</td>
              <td>
                <div className={`cellWithStatus ${item.status}`}>
                  {item.status}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
