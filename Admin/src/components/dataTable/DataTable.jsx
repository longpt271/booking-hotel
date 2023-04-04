import { DataGrid } from '@mui/x-data-grid';

const DataTable = props => {
  return (
    <DataGrid
      getRowId={row => row._id}
      className="datagrid"
      rows={props.rows}
      columns={props.columns}
      pageSize={9}
      rowsPerPageOptions={[9]}
      checkboxSelection
    />
  );
};

export default DataTable;
