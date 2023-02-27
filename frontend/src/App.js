import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard';
import Login from './components/Auth/login';
// import
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// React Router import S
import SupplierManagement from './pages/suppliermanagement';
import Item from './pages/item';
function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken['access']));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
//   console.log(userToken,userToken != null && userToken.length > 1);
  return userToken != null && userToken.length > 1;
}

function App() {
    const token = getToken();
    // const [token, setToken] = useState();

    if(!token) {
        return <Login setToken={setToken} />
      }
    return (
        <BrowserRouter>
            <Navbar />
            <div className="pcoded-main-container">
                <div className="pcoded-wrapper">
                    <div className="pcoded-content">
                        <div className="card p-5">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/suppliermanagement" element={<SupplierManagement />} />
                                <Route path="/item" element={<Item />} />
                                <Route path="/inventory" element={<Item />} />
                                <Route path="/order" element={<Item />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
