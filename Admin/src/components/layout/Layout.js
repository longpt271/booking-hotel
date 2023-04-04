import './Layout.scss';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';

const Layout = props => {
  return (
    <main className={`${props.className} main`}>
      <Sidebar />
      <div className="flexContainer">
        <Navbar />
        {props.children}
      </div>
    </main>
  );
};

export default Layout;
