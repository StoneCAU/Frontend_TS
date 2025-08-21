import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home/Home';
import ChatSetting from './Pages/ChatSetting/ChatSetting';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ChatSetting" element={<ChatSetting />} />
      </Routes>
    </Router>
  );
};

export default App;