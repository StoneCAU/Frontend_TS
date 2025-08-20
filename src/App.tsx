import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;