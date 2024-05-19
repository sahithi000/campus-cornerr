import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = { username, password };
      const response = await axios.post("http://localhost:5000/login", user);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setLoggedIn(true);
        console.log("Login successful!");
        window.location.href = "/home";
      } else {
        setErrorMessage("Invalid username or password. Please try again");
        alert("Invalid username or password. Please try again");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred while logging in. Please try again.");
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <div className="user-box">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <center>
            <button type="submit">
              Login
              <span></span>
            </button>
          </center>
        </form>
        <center>
          <p>
            No account? <Link to="/signup">Signup</Link>
          </p>
        </center>
      </div>
    </div>
  );
}

export default Login;



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const handleLogin = async (e) => {
//     e.preventDefault();
  
//     try {
//       const user = { username, password };
//       const response = await axios.post("http://localhost:5000/login", user);
  
//       if (response.status === 200) {
//         console.log("Login successful!");
//         window.location.href = "/home";
//       } else {
//         setErrorMessage("Invalid username or password. Please try again");
//         alert("Invalid username or password. Please try again");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setErrorMessage("An error occurred while logging in. Please try again.");
//       alert("An error occurred while logging in. Please try again.");
//     }
//   };
  

//   return (
//     <div className="login-body">
//     <div className="login-container">
//       {/* <h2>Login</h2> */}
//       <form onSubmit={handleLogin}>
//         <div className="used-box">
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <label htmlFor="username">Username</label>
//         </div>

//         <div className="used-box">
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <label htmlFor="password">Password</label>
//         </div>
//         <center>
//           <button type="submit">
//             Login
//             <span></span>
//           </button>
//         </center>
//       </form>
//       <center>
//         <p>
//           No account ? <Link to="/signup">Signup</Link>
//         </p>
//       </center>
//     </div>
//     </div>
//   );
// }

// export default Login;
