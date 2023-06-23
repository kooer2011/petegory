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



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grooming" element={<GrooMing />} />
        <Route path="/hotel" element={<HoTel />} />
        <Route path="/contact" element={<ConTact />} />
        <Route path="/gallary" element={<GaLLery />} />
        <Route path="/signup" element={<SignupContainer />} />
        <Route path="/login" element={<LoginSignupContainer />} />
        <Route path="/admin/dashboard" element={<Dashboard />} >
          <Route path="/admin/dashboard/users" element={<Users />} />
          <Route path="/admin/dashboard/users/create" element={<Create />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
