import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CountryPage from "./Country";
import StatePage from "./state";
import DistrictPage from "./district";
import CityPage from "./city";
import FullAddressPage from "./EnterLocation";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Country Page</Link></li>
          <li><Link to="/state">State Page</Link></li>
          <li><Link to="/district">District Page</Link></li>
          <li><Link to="/city">City Page</Link></li>
          <li><Link to="/EnterLocation">Address Page</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<CountryPage />} />
        <Route path="/state" element={<StatePage />} />
        <Route path="/district" element={<DistrictPage />} />
        <Route path="/city" element={<CityPage />} />
        <Route path="/EnterLocation" element={<FullAddressPage />} />
      </Routes>
    </Router>
  );
}

export default App;
