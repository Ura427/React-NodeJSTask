import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryListPage from './pages/countryListPage/countryListPage';
import CountryInfoPage from './pages/countryInfoPage/countryInfoPage';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CountryListPage/>} />
          <Route path="/country/:countryCode" element={<CountryInfoPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;