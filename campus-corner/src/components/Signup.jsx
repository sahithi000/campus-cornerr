import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Email domain validation
    if (!email.endsWith("@vishnu.edu.in")) {
      setAlertMessage("Email must be from the domain vishnu.edu.in");
      return;
    }

    try {
      const newUser = { username, email, password };
      await axios.post("http://localhost:5000/signup", newUser);
      console.log("User registered successfully!");

      window.location.href = "/login";
    } catch (error) {
      console.error("Error registering user:", error.response.data.error);
      setAlertMessage(error.response.data.error);
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <form onSubmit={handleSignup}>
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
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
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
          {alertMessage && <p className="error-message">{alertMessage}</p>}
          <center>
            <button type="submit">Sign Up</button>
          </center>
        </form>
        <center>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </center>
      </div>
    </div>
  );
}



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Signup.css";

// export default function Signup() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     // Email domain validation
//     if (!email.endsWith("@vishnu.edu.in")) {
//       setAlertMessage("Email must be from the domain vishnu.edu.in");
//       return;
//     }

//     try {
//       const newUser = { username, email, password };
//       await axios.post("http://localhost:5000/signup", newUser);
//       console.log("User registered successfully!");

//       window.location.href = "/login";
//     } catch (error) {
//       console.error("Error registering user:", error.response.data.error);
//       setAlertMessage(error.response.data.error);
//     }
//   };

//   return (
//     <div className="signup-body">
//       <div className="signup-container">
//         <form onSubmit={handleSignup}>
//           <div className="user-box">
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             <label htmlFor="username">Username</label>
//           </div>
//           <div className="user-box">
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <label htmlFor="email">Email</label>
//           </div>
//           <div className="user-box">
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <label htmlFor="password">Password</label>
//           </div>
//           {alertMessage && <p className="error-message">{alertMessage}</p>}
//           <center>
//             <button type="submit">Sign Up</button>
//           </center>
//         </form>
//         <center>
//           <p>
//             Already have an account? <Link to="/login">Login</Link>
//           </p>
//         </center>
//       </div>
//     </div>
//   );
// }
