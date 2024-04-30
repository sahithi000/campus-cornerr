import React, { useState } from "react";


function ProductForm() {
  const [productPic, setProductPic] = useState(
    "https://static.thenounproject.com/png/4696705-200.png"
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProductPic(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <h1>Describe the product</h1>
      <form action="/create" method="post">
        <div className="cont">
          <center>
            <p className="head">Include Some Details</p>
          </center>
          <span>Ad Title</span>
          <input type="text" name="name" placeholder="Enter here" required />
          <span>Set the Price</span>
          <input type="number" name="price" placeholder="Enter here" required />
          <span>Description</span>
          <input type="text" name="desc" placeholder="Enter here" required />
        </div>
        <div></div>
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
        <div></div>
        <div className="cont">
          <center>
            <p className="head">Include Your Details</p>
          </center>
          <span>Student Name</span>
          <input
            type="text"
            name="stu-name"
            placeholder="Enter here"
            required
          />
          <span>Department</span>
          <input
            type="text"
            name="dep-name"
            placeholder="Enter here"
            required
          />
          <span>Phone</span>
          <input
            type="number"
            name="phn-no"
            placeholder="Enter here"
            required
          />
        </div>
        <div></div>
        <div className="cont">
          <button type="submit">Post Your Add</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;