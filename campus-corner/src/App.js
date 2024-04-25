import './App.css';
import home from './components/home';
import login from './components/login';
import signup from './components/signup';
import { BrowserRouter as Router,Route,Switch,Routes} from 'react-router-dom' ;
import { useState } from 'react';
function App() {
  return (
    <div className="App">
      <div className='nav'>
        <Router>
          <Routes>
            <Route path='/' element="{<login/>} "></Route>
            <Route path='/signup' element="{<signup/>} "></Route>
            <Route path='/home' element="{<home/>} "></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
