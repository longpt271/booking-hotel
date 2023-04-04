const columnSources = {
  users: [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'username',
      headerName: 'Username',
      width: 250,
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 250,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
  ],
  hotels: [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 200,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 200,
    },
  ],
  rooms: [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'title',
      headerName: 'Title',
      width: 250,
    },
    {
      field: 'desc',
      headerName: 'Description',
      width: 400,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
    },
    {
      field: 'maxPeople',
      headerName: 'Max People',
      width: 200,
    },
  ],
  trans: [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'user',
      headerName: 'User',
      width: 180,
    },
    {
      field: 'hotel',
      headerName: 'hotel',
      width: 280,
      renderCell: params => {
        return <span>{params.row.hotel.name}</span>;
      },
    },
    {
      field: 'room',
      headerName: 'room',
      width: 150,
      renderCell: params => {
        let rooms = params.row.room
          .map(r => r.roomNumber)
          .toString()
          .replace(',', ', '); // Thêm khoảng cách sau dấu phẩy

        return <span>{rooms}</span>;
      },
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      renderCell: params => {
        return (
          <span>
            {params.row.dateStart} - {params.row.dateEnd}
          </span>
        );
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      renderCell: params => {
        return <span>${params.row.price}</span>;
      },
    },
    {
      field: 'payment',
      headerName: 'Payment Method',
      width: 130,
    },
  ],
  tranStatus: [
    {
      field: 'status',
      headerName: 'status',
      width: 150,
      renderCell: params => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ],
};

export default columnSources;
