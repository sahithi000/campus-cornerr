
import React, { useState } from "react";
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

  const uploadImage = async () => {
    try {
      const response = await axios.post("http://localhost:5000/upload-image", {
        base64: productPic,
      }, {
        maxContentLength: Infinity, // or any large number that fits your needs
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
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
      await uploadImage();
      const response = await axios.post("http://localhost:5000/create", {
        ...formData,
        image: productPic,
      });
      console.log(response.data);
      // Optionally, handle success response
      window.location.href = "/home";
    } catch (error) {
      console.error("Error posting product data:", error);
      // Optionally, handle error response
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Sidebar />
    <div className="sell-body">
    <div className="chi-cont">
      <h1>Describe the product</h1>
      <form onSubmit={handleSubmit}>
        <div className="cont">
          <center>
            <p className="head">Include Some Details</p>
          </center>
          <span>Ad Title</span>
          <input
            type="text"
            name="name"
            placeholder="Enter here"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <span>Set the Price</span>
          <input
            type="number"
            name="price"
            placeholder="Enter here"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <span>Description</span>
          <input
            type="text"
            name="desc"
            placeholder="Enter here"
            value={formData.desc}
            onChange={handleChange}
            required
          />
        </div>
        <div className="cont">
          <center>
            <p className="head">Include Image</p>
          </center>
          <img id="product-pic" src={productPic} alt="Product" />
          <label htmlFor="input-file">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            id="input-file"
            onChange={handleFileChange}
          />
        </div>
        <div className="cont">
          <center>
            <p className="head">Include Your Details</p>
          </center>
          <span>Student Name</span>
          <input
            type="text"
            name="stuName"
            placeholder="Enter here"
            value={formData.stuName}
            onChange={handleChange}
            required
          />
          <span>Department</span>
          <input
            type="text"
            name="depName"
            placeholder="Enter here"
            value={formData.depName}
            onChange={handleChange}
            required
          />
          <span>Phone</span>
          <input
            type="number"
            name="phnNo"
            placeholder="Enter here"
            value={formData.phnNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="cont">
          <button type="submit" disabled={isSubmitting}>
            Post Your Ad
          </button>
        </div>
      </form>
    </div>
    </div>
    </>
  );
}

export default ProductForm;

