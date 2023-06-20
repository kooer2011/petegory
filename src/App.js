import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './page/Home';
import GrooMing from './page/Grooming';
import HoTel from './page/Hotel';
import ConTact from './page/ConTact';
import GaLLery from './page/GaLLery';
import SignUp from './page/SignUp';
import LoginSignupContainer from './page/LoginSignupContainer';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/groom1" element={<GrooMing />} />
        <Route path="/hotel_1" element={<HoTel />} />
        <Route path="/contact_1" element={<ConTact />} />
        <Route path="/gallary" element={<GaLLery />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginSignupContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
