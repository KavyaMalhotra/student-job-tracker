import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import AddJob from './pages/AddJob';
import ViewJobs from './pages/ViewJobs';
import EditJob from './pages/EditJob';

// Components
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddJob />} />
          <Route path="/view" element={<ViewJobs />} />
          <Route path="/edit/:id" element={<EditJob />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
