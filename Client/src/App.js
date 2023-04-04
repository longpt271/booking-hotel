import React, { useContext, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from 'context/AuthContext';

// import react-toastify để tạo thông báo
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingSpinner from 'components/UI/LoadingSpinner/LoadingSpinner';
// Thêm Lazy Loading
const Auth = React.lazy(() => import('pages/auth/Auth'));
const HomePage = React.lazy(() => import('pages/HomePage'));
const HotelPage = React.lazy(() => import('pages/HotelPage'));
const HotelsPage = React.lazy(() => import('pages/HotelsPage'));
const TransPage = React.lazy(() => import('pages/TransPage'));
const UserPage = React.lazy(() => import('pages/UserPage'));

function App() {
  // lấy ra user từ ctx
  const { user } = useContext(AuthContext);
  const isAuth = Boolean(user);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/hotels/:hotelId" element={<HotelPage />} />

            {isAuth && (
              <>
                <Route path="/transactions" element={<TransPage />} />
                <Route path="user-info" element={<UserPage />} />
              </>
            )}

            {!isAuth && (
              <>
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/register" element={<Auth />} />
              </>
            )}

            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
