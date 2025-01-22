import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import Input from './Input';
import CarbonEmission from './CarbonEmission';
import Profile from './Profile';
import About from './About';
import Faq from './Faq';
import Afforestation from './Afforestation'; 
import Report from './Reportt'

function App() {
  return (
    
      <div className="App">
        <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/inputfromuser" element={<Input />}/>
          <Route path='/emission' element={<CarbonEmission />}/>
          <Route path='/my-account' element={<Profile />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/faqs' element={<Faq />}/>
          <Route path="/afforestation" element={<Afforestation />} />
          <Route path='/report' element={<Report />}/>

        </Routes>
        </Router>
      </div>
   
  );
}

export default App;
