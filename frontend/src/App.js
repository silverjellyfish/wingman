import './App.css';
import Register from './register';
import AboutUs from './aboutUs';
import Login from './login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <a href="/">Go Home</a>
      <a href="/register">Go to Register</a>
      <a href="/aboutUs">Go to About Us</a>
      <a href="/login">Go to Login</a>
    </div>
  );
}

export default App;
