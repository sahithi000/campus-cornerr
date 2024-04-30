import React, { useState } from "react";
import axios from "axios";


function ProductForm() {
  const [productPic, setProductPic] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    stuName: "",
    depName: "",
    phnNo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProductPic(URL.createObjectURL(file));
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
    if (!formData.name || !formData.price || !formData.desc || !formData.stuName || !formData.depName || !formData.phnNo || !productPic) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/create", {
        ...formData,
        image: productPic,
      });
      console.log(response.data);
      // Optionally, handle success response
      window.location.href = '/home';
    } catch (error) {
      console.error("Error posting product data:", error);
      // Optionally, handle error response
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
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
          <button type="submit" disabled={isSubmitting}>Post Your Ad</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
