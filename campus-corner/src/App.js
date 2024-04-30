import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Events from './components/Events';
import Sidebar from './components/sidebar';
import Login from './components/login';
import Signup from './components/signup';
import Profile from './components/profile';
import Home from './components/home';
import Navbar from './components/navbar';
import ProductForm from './components/sellform';


function App() {
  return (
    <div className="App">
      <div className='nav'>
        <Router>
        <Navbar />
          <Routes>
          
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            
            <Route path='/home' element={<Sidebar><Home /></Sidebar>} />
            <Route path='/events' element={<Sidebar><Events /></Sidebar>} />
            <Route path='/profile' element={<Sidebar><Profile /></Sidebar>} />
            <Route path='/sellform' element={<ProductForm />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
