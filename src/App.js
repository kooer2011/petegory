import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GrooMing from './page/Grooming';
import ConTact from './page/ConTact';
import GaLLery from './page/GaLLery';
import Dashboard from './page/Dashboard';
// import Users from './page/Users';
import Create from './page/Create';
import Userpage from './page/Userpage';
import HotelDetail from './page/HotelDetail';

import HotelCreate from './page/HotelCreate';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import PrivateRoute from './components/ProtectedRoute/PrivateRoute';
import PublicRoute from './components/ProtectedRoute/PublicRoute';
import Profile from './components/Profile/Profile';
import HotelPage from './components/Hotel/HotelPage';
import NotificationPage from './page/NotificationPage';
import Users from './page/Admin/Users';
import Employees from './page/Admin/Employees';
import AddUser from './page/Admin/AddUser';
import Hotels from './page/Admin/Hotels';
import Error from './components/404error/Errror';
import AddEmployees from './page/Admin/AddEmployees';
import Login from './page/Login';
import SignUp from './page/SignUp';
import ForgotPassword from './components/Profile/ForgotPassword';
import ResetPassword from './components/Profile/ResetPassword';
import EditUser from './page/Admin/EditUser';
import EditEmployee from './page/Admin/EditEmployee';
import AllBookings from './page/Admin/AllBookings';

import EditBooking from './page/Admin/EditBooking';
import EditHotel from './page/Admin/EditHotel';
import News from './page/Admin/News';
import CreateNews from './page/Admin/CreateNews';
import EditNews from './page/Admin/EditNews';
import { motion, AnimatePresence } from 'framer-motion';
import Gallery from './page/Admin/Gallery';
import CreateGallery from './page/Admin/CreateGallery';
import EditGallery from './page/Admin/EditGallery';
import BookingGrooming from './page/BookingGrooming.js';
import HoTel from './page/Hotel';
function App() {
  const { loading } = useSelector(state => state.alerts);
  const { user } = useSelector(state => state.user);
  return (
    <Router>
      {loading ? (
        <Spinner />
      ) : (
        <AnimatePresence>
          <Routes>
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/reset-password/:id/:token"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />
            <Route path="/" element={<Userpage />} />
            <Route path="/grooming" element={<GrooMing />} />
            <Route
              path="/grooming/booking"
              element={
                <PrivateRoute>
                  <BookingGrooming />
                </PrivateRoute>
              }
            />
            <Route path="/hotel" element={<HoTel />} />

            <Route
              path="/hotel/detail-booking"
              element={
                <PrivateRoute>
                  <HotelDetail />
                </PrivateRoute>
              }
            />

            <Route path="/contact" element={<ConTact />} />
            <Route path="/gallery" element={<GaLLery />} />

            <Route
              path="/profile/:activepage"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? (
                    <Dashboard />
                  ) : (
                    <Error />
                  )}
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/users"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? <Users /> : <Error />}
                </PrivateRoute>
              }
            />
            <Route
              path="/newusers"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? <AddUser /> : <Error />}
                </PrivateRoute>
              }
            />
            <Route
              path="/edituser/:id"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? <EditUser /> : <Error />}
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/employees"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? (
                    <Employees />
                  ) : (
                    <Error />
                  )}
                </PrivateRoute>
              }
            />
            <Route
              path="/newemployees"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? (
                    <AddEmployees />
                  ) : (
                    <Error />
                  )}
                </PrivateRoute>
              }
            />
            <Route
              path="/editemployee/:id"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? (
                    <EditEmployee />
                  ) : (
                    <Error />
                  )}
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/users/create"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? <Create /> : <Error />}
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/hotel"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? <Hotels /> : <Error />}
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/create-hotel"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? (
                    <HotelCreate />
                  ) : (
                    <Error />
                  )}
                </PrivateRoute>
              }
            />
            <Route
              path="/edithotel/:id"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? (
                    <EditHotel />
                  ) : (
                    <Error />
                  )}
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/notification"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? (
                    <NotificationPage />
                  ) : (
                    <Error />
                  )}
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/news"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? <News /> : <Error />}
                </PrivateRoute>
              }
            />
            <Route
              path="/createnews"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? (
                    <CreateNews />
                  ) : (
                    <Error />
                  )}
                </PrivateRoute>
              }
            />
            <Route
              path="/editNews/:id"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? <EditNews /> : <Error />}
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/gallery"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? <Gallery /> : <Error />}
                </PrivateRoute>
              }
            />
            <Route
              path="/creategallery"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? (
                    <CreateGallery />
                  ) : (
                    <Error />
                  )}
                </PrivateRoute>
              }
            />
            <Route
              path="/editGall/:id"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? (
                    <EditGallery />
                  ) : (
                    <Error />
                  )}
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard/all-bookings"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? (
                    <AllBookings />
                  ) : (
                    <Error />
                  )}
                </PrivateRoute>
              }
            />
            <Route
              path="/editbookhotel/:id"
              element={
                <PrivateRoute>
                  {user?.isAdmin || user?.isEmployee ? (
                    <EditBooking />
                  ) : (
                    <Error />
                  )}
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Error />} />
          </Routes>
        </AnimatePresence>
      )}
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
