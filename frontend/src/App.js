
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css';
import 'react-notifications/lib/notifications.css';
import Register from './Views/Register';
import Login from './Views/Login';
import Dashboard from './Views/Dashboard';
import Tictactoe from './Views/Tictactoe';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/tictactoe' element={<Tictactoe/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
