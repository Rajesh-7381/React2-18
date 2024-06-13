
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css';
import 'react-notifications/lib/notifications.css';
import Register from './Views/Register';
import Login from './Views/Login';
import Dashboard from './Views/Dashboard';
import Tictactoe from './Views/Tictactoe';
import Amazon from './Views/Amazon';
import Home from './Views/Home';
import Update from './Views/Update';
import Cart from './Views/Cart';
import Cancel from './Views/Cancel';
import Success from './Views/Success';
import CartDetails from './Views/CartDetails';
import DataBinding from './Components/DataBinding';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/update/:id' element={<Update/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/tictactoe' element={<Tictactoe/>} />
          <Route path='/amazon' element={<Amazon/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/success' element={<Success/>} />          
          <Route path='/cancel' element={<Cancel/>} />
          <Route path='/cartdetails/:id' element={<CartDetails/>} />
          <Route path='/ecom' element={<Home/>} />

          
          <Route path='/databinding' element={<DataBinding/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
