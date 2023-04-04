import React, { useEffect } from 'react';

import Layout from 'components/Layout/Layout';
import Transactions from 'components/Transactions/Transactions';

const TransPage = () => {
  useEffect(() => {
    // tự động scroll về đầu trang
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <Transactions />
    </Layout>
  );
};

export default TransPage;
