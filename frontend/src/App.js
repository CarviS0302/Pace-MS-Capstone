import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// React Router import S
import SupplierManagement from './pages/suppliermanagement';
import Item from './pages/item';

function App() {
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
