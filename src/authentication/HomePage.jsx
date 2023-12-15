import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

const HomePage = () => {
  const [ads, setAds] = useState([]);


  // useEffect(() => {

  //   const fetchAdsFromAPI = async () => {
  //     try {
  //       const response = await fetch('https://api.example.com/ads');
  //       const data = await response.json();
  //       setAds(data);
  //     } catch (error) {
  //       console.error('Error fetching ads:', error);
  //     }
  //   };

  //   fetchAdsFromAPI();
  // }, []);
  const banners = [
    { id: 1, url: 'https://media.tenor.com/CugVscSLliYAAAAM/advertise.gif', },
    { id: 2, url: 'https://media1.tenor.com/m/bvUpxWn4X7oAAAAC/advertising-discord.gif' },
    { id: 3, url: 'https://media.tenor.com/CugVscSLliYAAAAM/advertise.gif' },
    { id: 4, url: 'https://media1.tenor.com/m/bvUpxWn4X7oAAAAC/advertising-discord.gif' },
    { id: 5, url: 'https://media.tenor.com/KKs6O0_AXjkAAAAM/spamton-ad.gif' },
    { id: 6, url: 'https://media1.tenor.com/m/bvUpxWn4X7oAAAAC/advertising-discord.gif' },
    { id: 7, url: 'https://media.tenor.com/2rUet8lfLb8AAAAM/gaming-mobile-game-ad.gif', },
    { id: 8, url: 'https://media1.tenor.com/m/bvUpxWn4X7oAAAAC/advertising-discord.gif' },
    { id: 9, url: 'https://media.tenor.com/CugVscSLliYAAAAM/advertise.gif' },
    { id: 10, url: 'https://media1.tenor.com/m/bvUpxWn4X7oAAAAC/advertising-discord.gif' },
    { id: 11, url: 'https://media.tenor.com/CugVscSLliYAAAAM/advertise.gif' },
    { id: 12, url: 'https://media1.tenor.com/m/bvUpxWn4X7oAAAAC/advertising-discord.gif' },
  ];


  return (
    <>
      <nav>
        <div className="d-flex align-items-center text-center align-middle" style={{ height: "50px" }}>
          <img
            src="data:image/jpeg;base64,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"
            alt="Logo"
            className="logo"
          />
          <span className="align-middle h5 mt-2">Ads Manager</span>
        </div>
        <div className="d-flex align-items-center">
          <Link to="/userdashboard/services" className="text-white mr-5">Services</Link>

          <Link to="/signin" className="btn btn-outline-light mr-2">Sign In</Link>
          <Link to="/signup" className="btn btn-light">Sign Up</Link>
        </div>
      </nav>


      {/* <div className="ads-section">
        {ads.map((ad, index) => (
          <div key={index} className="ad-item">
       
            <img src={ad.imageUrl} alt={ad.title} className="img-fluid" />
            <p>{ad.description}</p>
          </div>
        ))}
      </div> */}

<h2 className="text-center mb-4 welcome-heading mt-2">Welcome to Our Website</h2>

<p className="text-center mb-4 animated-text">
  Explore amazing features and services.
</p>

      <div>
        {/* {banners.map((banner) => (
          <div key={banner.id} className="banner" style={{ width: 'auto', height: 'auto', border: '1px solid #ccc', marginTop: '10px' }}>
            <img src={banner.url} alt={`Banner ${banner.id}`} style={{ width: banner.width, height: 'auto' }} />
          </div>
        ))} */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
  {banners.map((banner) => (
    <div key={banner.id} className="banner" style={{ width: banner.width, margin: '10px', display: 'flex' }}>
      <img src={banner.url} alt={`Banner ${banner.id}`} style={{ width: '100%', height: 'auto' }} />
    </div>
  ))}
</div>
      </div>
      {/* <div className="text-center mb-4">
        <img
          src="https://via.placeholder.com/800x400"
          alt="Placeholder Image"
          className="img-fluid"
        />
      </div> */}

      {/* <footer className="footer">
        <p>&copy; 2023 Your Company Name</p>
      </footer> */}

    </>
  );
};

export default HomePage;
