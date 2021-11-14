import logo from './logo.svg';
import './App.css';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Auth from './views/Auth';
import AuthContextProvider from './context/AuthContext';
import DashBoard from './views/DashBoard';
import DashBoardPlayer from './views/DashBoardPlayer';
import LoginForm from './components/auth/LoginForm';
import { Component } from 'react';
import { Navigate } from 'react-router';
import PrivateRoute from './routing/PrivateRoute';

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
        <Route path='/dashboard' element={ 
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute> } />
        <Route path='/dashboardplayer' element={
            <PrivateRoute  player={true}>
              <DashBoardPlayer/> 
            </PrivateRoute> } />
      </Routes>
    </Router>
    </AuthContextProvider>
    
    </>
  );
}

export default App;
