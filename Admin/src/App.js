import React, { Suspense } from 'react';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from 'context/AuthContext';
import LoadingSpinner from 'components/UI/LoadingSpinner/LoadingSpinner';
import List from './pages/list/List';

// import react-toastify để tạo thông báo
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// kiểm tra xem có phải mobile hay k
import UAParser from 'ua-parser-js';
const parser = new UAParser();
const deviceInfo = parser.getResult();
// console.log(deviceInfo.device.type);

// Thêm Lazy Loading
const Auth = React.lazy(() => import('pages/auth/Auth'));
const Home = React.lazy(() => import('pages/home/Home'));
const UserInfo = React.lazy(() => import('components/userInfo/UserInfo'));
const EditUser = React.lazy(() => import('pages/editUser/EditUser'));
const NewUser = React.lazy(() => import('pages/newUser/NewUser'));
const NewHotel = React.lazy(() => import('pages/newHotel/NewHotel'));
const NewRoom = React.lazy(() => import('pages/newRoom/NewRoom'));
const MobileWarning = React.lazy(() =>
  import('pages/mobileWarning/MobileWarning')
);

function App() {
  // lấy ra user từ ctx
  const { user } = useContext(AuthContext);

  const isAuth = Boolean(user);
  // console.log(isAuth);

  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(deviceInfo.device.type === 'mobile');
  }, [isMobileDevice]);

  return (
    <div className="app">
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          {!isMobileDevice && (
            <Routes>
              {isAuth && (
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="auth">
                    <Route index element={<Auth />} />
                    <Route path="register" element={<Auth />} />
                  </Route>

                  <Route path="user-info">
                    <Route index element={<UserInfo />} />
                    <Route path="edit/:userId" element={<EditUser />} />
                  </Route>
                  <Route path="users">
                    <Route index element={<List title="Users" />} />
                    <Route path="new" element={<NewUser />} />
                  </Route>
                  <Route path="hotels">
                    <Route index element={<List title="Hotels" />} />
                    <Route path="new" element={<NewHotel />} />
                    <Route
                      path="edit/:hotelId"
                      element={<NewHotel editing />}
                    />
                  </Route>
                  <Route path="rooms">
                    <Route index element={<List title="Rooms" />} />
                    <Route path="new" element={<NewRoom />} />
                    <Route path="edit/:roomId" element={<NewRoom editing />} />
                  </Route>
                  <Route path="transactions">
                    <Route index element={<List title="Transactions" />} />
                  </Route>

                  <Route path="*" element={<Navigate replace to="/" />} />
                </Route>
              )}

              {!isAuth && (
                <Route path="/">
                  <Route index element={<Navigate to="/auth" />} />
                  <Route path="auth">
                    <Route index element={<Auth />} />
                    <Route path="register" element={<Auth />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/auth" />} />
                </Route>
              )}
            </Routes>
          )}
          {isMobileDevice && (
            <Routes>
              <Route path="/" element={<MobileWarning />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
