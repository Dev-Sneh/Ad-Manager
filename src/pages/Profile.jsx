// Profile.js

import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'raj',
    lastName: 'garg',
    email: 'raj@gmail.com',
    phone: '7872872667',
    country: 'India',
    city: 'Delhi',
    image: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
  });
  const [originalData, setOriginalData] = useState({}); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
    setOriginalData({ ...formData }); // Save the original data for cancel
  };

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
  
    navigate('/userdashboard');
  };
  const handleSaveButtonClick = async () => {
    try {
      // Send data to the server and update formData if successful
      await axios.post('https://ad-manager.onrender.com/api/profile', formData);
      const userDataResponse = await axios.get('https://ad-manager.onrender.com/api/profile');
      const userData = userDataResponse.data;

      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        country: userData.country,
        city: userData.city,
        image: userData.image,
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Save failed:', error.response.data.message);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({ ...originalData }); // Revert changes to the original data
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main-container">
      {/* Left Side */}
      <div className="back-button-container">
        <button className="back-button" onClick={handleBackButtonClick}>
          <span>&larr;</span> Back
        </button>
      </div>

      <div className="leftside">
        <div className="profileimg">
          <img className="image" src={formData.image} alt="" />
        </div>
        <div className="edit">
          {isEditing && (
            <label htmlFor="imageUpload">
              <img className="image" src="https://cdn.pixabay.com/photo/2017/06/06/00/33/edit-icon-2375785_1280.png" alt="" />
            </label>
          )}
          <input type="file" id="imageUpload" style={{ display: 'none' }} onChange={handleImageUpload} />
        </div>
        <div className="profilename">
          <h4>Profile Name</h4>
        </div>
        {/* <div>
          <h6>Date of birth</h6>
        </div> */}
      </div>

      {/* Right Side */}
      <div className="rightside">
        <div className="form-container">
          <div className="form-column">
            <label>
              First Name:
              {isEditing ? (
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
              ) : (
                <div>{formData.firstName}</div>
              )}
            </label>
            <label>
              Email:
              {isEditing ? (
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
              ) : (
                <div>{formData.email}</div>
              )}
            </label>
            <label>
              Country:
              {isEditing ? (
                <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
              ) : (
                <div>{formData.country}</div>
              )}
            </label>
          </div>

          <div className="form-column">
            <label>
              Last Name:
              {isEditing ? (
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
              ) : (
                <div>{formData.lastName}</div>
              )}
            </label>
            <label>
              Phone:
              {isEditing ? (
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
              ) : (
                <div>{formData.phone}</div>
              )}
            </label>
            <label>
              City:
              {isEditing ? (
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
              ) : (
                <div>{formData.city}</div>
              )}
            </label>
          </div>
        </div>
        {isEditing ? (
          <div className="button-group">
            <button className="button save-button" onClick={handleSaveButtonClick}>
              Save
            </button>
            <button className="button cancel-button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="button edit-button" onClick={handleEditButtonClick}>
            Edit Name
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
