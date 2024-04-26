import './App.css';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className='nav'>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
