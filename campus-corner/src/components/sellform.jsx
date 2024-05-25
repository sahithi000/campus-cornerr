import React, { useState,useEffect } from "react";
import axios from "axios";
import './Sellform.css';
import Sidebar from "./Sidebar";

function ProductForm() {
  const [productPic, setProductPic] = useState("https://static.thenounproject.com/png/4696705-200.png");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    stuName: "",
    depName: "",
    phnNo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const covertToBase64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductPic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event) => {
    covertToBase64(event);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formData.name ||
      !formData.price ||
      !formData.desc ||
      !formData.stuName ||
      !formData.depName ||
      !formData.phnNo ||
      !productPic
    ) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/create", {
        ...formData,
        image: productPic,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in local storage
        },
        maxContentLength: Infinity, // Ensure this is set for large payloads
      });
      console.log(response.data);
      window.location.href = "/home";
    } catch (error) {
      console.error("Error posting product data:", error);
      alert("others registered number cannot be used");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    // Change the top position of the Sidebar to 0px when component mounts
    document.querySelector('.sidebar').style.top = '0px';
    // Clean up function to reset the top position when component unmounts
    return () => {
      document.querySelector('.sidebar').style.top = '77px'; // Reset top position
    };
  }, []);
  return (
    <>
      <Sidebar />
      <div className="sell-body">
      <h1>Product Details</h1>
        <div className="chi-cont">
          
          <form onSubmit={handleSubmit}>
            <div className="divv">
            <div className="cont">
              
              
              <input
                type="text"
                name="name"
                placeholder="Enter Product Title"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <input
                type="number"
                name="price"
                placeholder="Enter Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
              
              <input
                type="text"
                name="desc"
                placeholder="Product Description"
                value={formData.desc}
                onChange={handleChange}
                required
              />
              
              <img id="product-pic" src={productPic} alt="Product" />
              
              <input
                type="file"
                accept="image/*"
                id="input-file"
                onChange={handleFileChange}
              />
            </div>
            <div className="cont1">
              
              <input
                type="text"
                name="stuName"
                placeholder="Registered Number"
                value={formData.stuName}
                onChange={handleChange}
                required
              />
              
              <select
                type="text"
                name="depName"
                placeholder="Your Department"
                value={formData.depName}
                onChange={handleChange}
                required>
                <option ></option>
                <option>
                  IT
                </option>
                <option>
                  CSE
                </option>
                <option>
                  AIML
                </option>
                <option>
                  AIDS
                </option>
                <option>
                  ECE
                </option>
                <option>
                  MECH
                </option>
                <option>
                  EEE
                </option>
                <option>
                  CIVIL
                </option>
              </select>
              
              <input
                type="number"
                name="phnNo"
                placeholder="Your Mobile number"
                value={formData.phnNo}
                onChange={handleChange}
                required
              />
              <button type="submit" id="btn" disabled={isSubmitting}>
                Post 
              </button>
            </div>
          
              
            
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductForm;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import './Sellform.css';
// import Sidebar from "./Sidebar";

// function ProductForm() {
//   const [productPic, setProductPic] = useState("https://static.thenounproject.com/png/4696705-200.png");
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     desc: "",
//     stuName: "",
//     depName: "",
//     phnNo: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get("http://localhost:5000/user-details", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setFormData((prevData) => ({
//           ...prevData,
//           stuName: response.data.username
//         }));
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const covertToBase64 = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setProductPic(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleFileChange = (event) => {
//     covertToBase64(event);
//   };

//   const uploadImage = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/upload-image", {
//         base64: productPic,
//       }, {
//         maxContentLength: Infinity, // or any large number that fits your needs
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (
//       !formData.name ||
//       !formData.price ||
//       !formData.desc ||
//       !formData.stuName ||
//       !formData.depName ||
//       !formData.phnNo ||
//       !productPic
//     ) {
//       alert("Please fill in all fields and upload an image.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       if (formData.stuName !== formData.username) {
//         setErrorMessage("stuName does not match logged-in user.");
//         setIsSubmitting(false);
//         return;
//       }

//       await uploadImage();
//       const token = localStorage.getItem('token');
//       const response = await axios.post("http://localhost:5000/create", {
//         ...formData,
//         image: productPic,
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       console.log(response.data);
//       // Optionally, handle success response
//       window.location.href = "/home";
//     } catch (error) {
//       console.error("Error posting product data:", error);
//       if (error.response && error.response.data && error.response.data.error) {
//         setErrorMessage(error.response.data.error);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <Sidebar />
//       <div className="sell-body">
//         <div className="chi-cont">
//           <h1>Describe the product</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="cont">
//               <center>
//                 <p className="head">Include Some Details</p>
//               </center>
//               <span>Ad Title</span>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter here"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <span>Set the Price</span>
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Enter here"
//                 value={formData.price}
//                 onChange={handleChange}
//                 required
//               />
//               <span>Description</span>
//               <input
//                 type="text"
//                 name="desc"
//                 placeholder="Enter here"
//                 value={formData.desc}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="cont">
//               <center>
//                 <p className="head">Include Image</p>
//               </center>
//               <img id="product-pic" src={productPic} alt="Product" />
//               <label htmlFor="input-file">Upload Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 id="input-file"
//                 onChange={handleFileChange}
//               />
//             </div>
//             <div className="cont">
//               <center>
//                 <p className="head">Include Your Details</p>
//               </center>
//               <span>Student Registered Number</span>
//               <input
//                 type="text"
//                 name="stuName"
//                 placeholder="Enter here"
//                 value={formData.stuName}
//                 onChange={handleChange}
//                 readOnly
//                 required
//               />
//               <span>Department</span>
//               <input
//                 type="text"
//                 name="depName"
//                 placeholder="Enter here"
//                 value={formData.depName}
//                 onChange={handleChange}
//                 required
//               />
//               <span>Phone</span>
//               <input
//                 type="number"
//                 name="phnNo"
//                 placeholder="Enter here"
//                 value={formData.phnNo}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="cont">
//               <button type="submit" disabled={isSubmitting}>
//                 Post Your Ad
//               </button>
//               {errorMessage && <h1>{errorMessage}</h1>}
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductForm;



