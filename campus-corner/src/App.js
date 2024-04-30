import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Events from "./components/Events";
import Sidebar from "./components/sidebar";
import Login from "./components/login";
import Signup from "./components/signup";
import Profile from "./components/profile";
// import Home from "./components/home";
import Navbar from "./components/navbar";
import ProductForm from "./components/sellform";

import HomeWithProducts from "./components/homewithproducts" ;// New component to render product cards

function App() {
  return (
    <Router>
      <div className="App">
        <div className="nav">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomeWithProducts  />} />
            <Route path="/*" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function MainContent() {
  return (
    <Sidebar>
      <Routes>
        {/* <Route path="/home" element={<Navbar><HomeWithProducts  /></Navbar>} /> */}
        <Route path="/events" element={<Navbar><Events /></Navbar>} />
        <Route path="/profile" element={<Navbar><Profile /></Navbar>} />
        <Route path="/sellform" element={<ProductForm />} />
      </Routes>
    </Sidebar>
  );
}


export default App;
