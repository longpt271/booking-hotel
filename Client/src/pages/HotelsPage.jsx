import React, { useEffect } from 'react';

import Layout from 'components/Layout/Layout';
import Hotels from 'components/Hotels/Hotels';

const HotelsPage = () => {
  useEffect(() => {
    // tự động scroll về đầu trang
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <Hotels />
    </Layout>
  );
};

export default HotelsPage;
