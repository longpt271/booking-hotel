import './list.scss';
import Layout from 'components/layout/Layout';
import columnSources from 'components/dataTable/columnSources';
import ListAction from 'components/list/ListAction';
import ListStatus from 'components/list/ListStatus';

const List = props => {
  return (
    <Layout className="list">
      {props.title === 'Users' && (
        <ListStatus title={props.title} columns={columnSources.users} />
      )}
      {props.title === 'Hotels' && (
        <ListAction title={props.title} columns={columnSources.hotels} />
      )}
      {props.title === 'Rooms' && (
        <ListAction title={props.title} columns={columnSources.rooms} />
      )}
      {props.title === 'Transactions' && (
        <ListStatus title={props.title} columns={columnSources.trans} />
      )}
    </Layout>
  );
};

export default List;
