import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Sidebar from './components/sidebar';
import Profile from './pages/Profile'
import './App.css';
function App() {
  return (
    <div className="App">
      <div className='nav'>
      <BrowserRouter>
          <Sidebar>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/events' element={<Events/>} />
            <Route path='/profile' element={<Profile/>} />
          </Routes>
          </Sidebar>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
