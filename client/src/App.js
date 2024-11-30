import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import TablePage from './Pages/Tablepage';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/table"
            element={
              <ProtectedRoute>
                <TablePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
