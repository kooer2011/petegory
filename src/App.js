import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './page/Home';
import GrooMing from './page/Grooming';
import HoTel from './page/Hotel';
import ConTact from './page/ConTact';
import GaLLery from './page/GaLLery';
import LoginSignupContainer from './page/LoginSignupContainer';
import SignupContainer from './page/SignupContainer';
import Dashboard from './page/Dashboard';
import Users from './page/Users';
import Create from './page/Create';
import Footer from './components/Footer/Footer';
import Userpage from './page/Userpage';
import HotelDetail from './page/HotelDetail';
import GroomBooking from './page/GroomBooking';
import HotelCreate from './page/HotelCreate';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import PrivateRoute from './components/ProtectedRoute/PrivateRoute';
import PublicRoute from './components/ProtectedRoute/PublicRoute'



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
          <Route path="/hotel" element={<HoTel />} />
          <Route path="/hotel/detail" element={<HotelDetail />} />
          <Route path="/contact" element={<ConTact />} />
          <Route path="/gallary" element={<GaLLery />} />

          <Route path="/admin/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } >
            <Route path="/admin/dashboard/users" element={<Users />} />
            <Route path="/admin/dashboard/users/create" element={<Create />} />
            <Route path="/admin/dashboard/hotel" element={<HotelCreate />} />
          </Route>

        </Routes>
      )}
      <Footer />
    </Router>
  );
}

export default App;
