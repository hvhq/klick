import logo from './logo.svg';
import './App.css';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Auth from './views/Auth';
import AuthContextProvider from './context/AuthContext';
import DashBoard from './views/DashBoard';
import DashBoardPlayer from './views/DashBoardPlayer';

function App() {
  return (
    <>
    <AuthContextProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/join' element={ <Auth authRoute='join' />} />
        <Route path='/login' element = { <Auth authRoute='login' />} />
        <Route path='/register' element = { <Auth authRoute='register' />} />
        <Route path='/dashboard' element = { <DashBoard /> } />
        <Route path='/dashboardplayer' element={ <DashBoardPlayer /> } />
      </Routes>
    </Router>
    </AuthContextProvider>
    
    </>
  );
}

export default App;
