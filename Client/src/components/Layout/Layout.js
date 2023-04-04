import NavBar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import PhoneRing from './PhoneRing/PhoneRing';

const Layout = props => {
  return (
    <>
      <NavBar />
      {props.children}
      <Footer />
      <PhoneRing />
    </>
  );
};

export default Layout;
