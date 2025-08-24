import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home/Home';
import ChatSetting from './Pages/ChatSetting/ChatSetting';
import UserNoteDetail from './Pages/UserNoteDetail/UserNoteDetail';
import UserNoteWrite from './Pages/UserNoteWrite';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ChatSetting" element={<ChatSetting />} />
        <Route path="/UserNoteDetail" element={<UserNoteDetail />} />
        <Route path="/UserNoteWrite" element={<UserNoteWrite />} />
      </Routes>
    </Router>
  );
};

export default App;