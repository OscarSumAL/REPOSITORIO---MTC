import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UsuariosPage from './pages/UsuariosPage';
import ExcelPage from './pages/ExcelPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/usuarios" element={<UsuariosPage />} />
                <Route path="/excel" element={<ExcelPage />} />
            </Routes>
        </Router>
    );
}

export default App;
