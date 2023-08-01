import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GrooMing from './page/Grooming';
import ConTact from './page/ConTact';
import GaLLery from './page/GaLLery';
import LoginSignupContainer from './page/LoginSignupContainer';
import SignupContainer from './page/SignupContainer';
import Dashboard from './page/Dashboard';
// import Users from './page/Users';
import Create from './page/Create';
import Userpage from './page/Userpage';
import HotelDetail from './page/HotelDetail';
import GroomBooking from './page/GroomBooking';
import HotelCreate from './page/HotelCreate';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import PrivateRoute from './components/ProtectedRoute/PrivateRoute';
import PublicRoute from './components/ProtectedRoute/PublicRoute'
import Profile from './components/Profile/Profile';
import HotelPage from './components/Hotel/HotelPage';
import NotificationPage from './page/NotificationPage';
import Users from './page/Admin/Users';
import Employees from './page/Admin/Employees';
import AddUser from './page/Admin/AddUser';
import Hotels from './page/Admin/Hotels';


function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <Router>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/signup"
            element={
              <PublicRoute>
                <SignupContainer />
              </PublicRoute>
            } />
          <Route path="/login"
            element={
              <PublicRoute>
                <LoginSignupContainer />
              </PublicRoute>
            } />
          <Route path="/" element={<Userpage />} />
          <Route path="/grooming" element={<GrooMing />} />
          <Route path='/grooming/booking'
            element={
              <PrivateRoute>
                <GroomBooking />
              </PrivateRoute>
            } />
          <Route path="/hotel" element={<HotelPage />} />

          <Route path="/hotel/detail-booking"
            element={
              <PrivateRoute>
                <HotelDetail />
              </PrivateRoute>
            } />

          <Route path="/contact" element={<ConTact />} />
          <Route path="/gallary" element={<GaLLery />} />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />


          <Route path="/admin/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
          <Route path="/admin/dashboard/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            } />
          <Route path="/newusers"
            element={
              <PrivateRoute>
                <AddUser />
              </PrivateRoute>
            } />
          <Route path="/admin/dashboard/employees"
            element={
              <PrivateRoute>
                <Employees />
              </PrivateRoute>
            } />
          <Route path="/admin/dashboard/users/create"
            element={
              <PrivateRoute>
                <Create />
              </PrivateRoute>
            } />
          <Route path="/admin/dashboard/hotel"
            element={
              <PrivateRoute>
                <Hotels />
              </PrivateRoute>
            } />
          <Route path="/admin/dashboard/create-hotel"
            element={
              <PrivateRoute>
                <HotelCreate />
              </PrivateRoute>
            } />
          <Route path="/admin/dashboard/notification"
            element={
              <PrivateRoute>
                <NotificationPage />
              </PrivateRoute>
            } />

        </Routes>
      )}
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
