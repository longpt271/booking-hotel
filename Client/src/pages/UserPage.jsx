import React, { useEffect } from 'react';

import Layout from 'components/Layout/Layout';
import UserInfo from 'components/UserInfo/UserInfo';

const UserPage = () => {
  useEffect(() => {
    // tự động scroll về đầu trang
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <UserInfo />
    </Layout>
  );
};

export default UserPage;
