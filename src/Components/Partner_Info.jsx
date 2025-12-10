import React, { useState, useEffect } from "react";
import "./Partner_Info.css";
import bgimage from "../Images/bgimage.jpg";
import { useNavigate } from "react-router-dom";

const Partner_Info = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("mobile")) navigate("/partner");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mobile = localStorage.getItem("mobile");

    const formData = new FormData();
    formData.append("mobile", mobile);
    formData.append("restaurantName", restaurantName);
    formData.append("foodName", foodName);
    formData.append("price", price);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("image", image);

    try {
    const res = await fetch("http://localhost:8085/add-restaurant", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("API Failed");
    }

    setMessage("✅ Data Stored Successfully");
    localStorage.removeItem("mobile");
  } catch (err) {
    console.error(err);
    setMessage("❌ Failed to store data");
  }
  };

  return (
    <div className="partner-container">
      <img src={bgimage} className="background-image" />

      <div className="nav1">
        <h2 className="logo1">CrazyCravings</h2>
      </div>

      <div className="content2">
        <h2>Restaurant Registration</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Restaurant Name" onChange={(e) => setRestaurantName(e.target.value)} />
          <input placeholder="Item Name" onChange={(e) => setFoodName(e.target.value)} />
          <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
          <input placeholder="State" onChange={(e) => setState(e.target.value)} />
          <input placeholder="City" onChange={(e) => setCity(e.target.value)} />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button type="submit">Save</button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
};

export default Partner_Info;
