import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import Login from './components/Login';
import HomePage from './view/Home';

function App() {

  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;