import logo from './logo.svg';
import './App.css';
import Landing from './components/layout/Landing';
import LoginForm  from './components/auth/LoginForm';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Auth from './views/Auth';
import JoinForm from './components/auth/JoinForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/join' element={ <Auth authRoute='join' />} />
        <Route path='/login' element = { <Auth authRoute='login' />} />
      </Routes>
    </Router>
  );
}

export default App;
