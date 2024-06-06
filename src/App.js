import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import { AuthContext } from './helpers/AuthContext';
import useAuth from './hooks/useAuth';

function App() {
  const auth = useAuth();

  return (
    <div className="App">
      <AuthContext.Provider value={auth}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={!auth.authState ? <Home /> : <Navigate to="/dashboard" />} />
              <Route path="/services" element={<Services />} />
              <Route path="/login" element={!auth.authState ? <Login /> : <Navigate to="/dashboard" />} />
              {auth.authState && (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </>
              )}
              <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown routes to home */}
            </Routes>
          </Layout>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
