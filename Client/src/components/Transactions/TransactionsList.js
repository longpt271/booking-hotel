const TransactionsList = ({ items = [] }) => {
  return (
    <table className="trans-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Info Booking</th>
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
              <td>
                <div>{item.hotel.name}</div>
                <div>{rooms}</div>
                <div>
                  {item.dateStart} - {item.dateEnd}
                </div>
                <div>${item.price}</div>
                <div>{item.payment}</div>
                <div>
                  <div className={`cellWithStatus ${item.status}`}>
                    {item.status}
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TransactionsList;
