import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Prepage from "./components/prepage";
import Events from "./pages/Events";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from './components/Profile';
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProductForm from "./components/Sellform";
import HomeWithProducts from "./components/homewithproducts";
import CreatorCard from "./components/creatercard";
import RingLoader from "react-spinners/RingLoader";
import Payment from "./components/payment";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Router>
      <div className="App">
        {loading ? (
          <RingLoader color={"#03f40f"} loading={loading} size={100} />
        ) : (
          <Routes>
            <Route path="/" element={<Prepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={loggedIn ? <Navigate to="/home" /> : <Login setLoggedIn={setLoggedIn} />} />
            <Route path="/about" element={<CreatorCard />} />
            <Route path="/payment/:price" element={<Payment />} />
            <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/sellform" element={<ProductForm />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/*" element={<MainContent />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <HomeWithProducts />
    </>
  );
}

function MainContent() {
  return (
    <Sidebar>
      <Routes>
        <Route
          path="/events"
          element={
            <Navbar>
              <Events />
            </Navbar>
          }
        />
        <Route
          path="/profile"
          element={
            <Navbar>
              <Profile />
            </Navbar>
          }
        />
      </Routes>
    </Sidebar>
  );
}

export default App;



// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Prepage from "./components/prepage";
// import Events from "./pages/Events";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Profile from "./components/profile";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import ProductForm from "./components/Sellform";
// import HomeWithProducts from "./components/homewithproducts";
// import CreatorCard from "./components/creatercard";
// import RingLoader from "react-spinners/RingLoader";
// import Payment from "./components/payment";


// function App() {
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, []);
//   return (
//     <Router>
//       <div className="App">
//         {loading ? (
//           <RingLoader color={"#03f40f"} loading={loading} size={100} />
//         ) : (
//           <Routes>
//             <Route path="/" element={<Prepage />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/about" element={<CreatorCard />} />
//             <Route path="/payment/:price" element={<Payment />} />
//             <Route path="/home/*" element={<Home />} />
//             <Route path="/*" element={<MainContent />} />
//             <Route path="/sellform" element={<ProductForm />} />
//           </Routes>
//         )}
//       </div>
//     </Router>
//   );
// }

// function Home() {
//   return (
//     <>
//       <Navbar />
//       <Sidebar />
//       <HomeWithProducts />
//     </>
//   );
// }

// function MainContent() {
//   return (
//     <Sidebar>
//       <Routes>
//         <Route
//           path="/events"
//           element={
//             <Navbar>
//               <Events />
//             </Navbar>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <Navbar>
//               <Profile />
//             </Navbar>
//           }
//         />
//       </Routes>
//     </Sidebar>
//   );
// }

// export default App;