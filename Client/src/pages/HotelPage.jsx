import React, { useEffect } from 'react';

import Layout from 'components/Layout/Layout';
import Hotel from 'components/Hotel/Hotel';

const HotelPage = () => {
  useEffect(() => {
    // tự động scroll về đầu trang
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <Hotel />
    </Layout>
  );
};

export default HotelPage;
