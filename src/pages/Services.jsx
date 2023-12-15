// Services.js

import React, { useState } from 'react';
import './Services.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StripeCheckout from 'react-stripe-checkout';
import './Services.css';
const Services = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [modal, setModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(''); // 'success' or 'failure'

  const REACT_APP_STRIPE_PUBLISHABLE_KEY = "pk_test_51OMwklSF5GOC4HBtbP10QYLTXTGwx1K6qQ9VQEJmKozJx7M8Pxm60kS8c7NzZhjTWYLItSDGyhENxuSNEM90P5bm00K04T4i0L";

  const serviceImages = [
    'https://source.unsplash.com/800x600/?service1',
    'https://source.unsplash.com/800x600/?service2',
    'https://source.unsplash.com/800x600/?service3',

  ];

  const prices = {
    USD: 50,
    INR: 83.27,
  };

  const exchangeRate = 50;

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const convertCurrency = (price) => {
    return selectedCurrency === 'USD' ? price : price * exchangeRate;
  };

  const handleToken = (token) => {

    fetch('https://ad-manager.onrender.com/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        amount: convertCurrency(prices[selectedCurrency]) * 100,
        currency: selectedCurrency.toLowerCase(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPaymentStatus('success');
        toggleModal();
      })
      .catch((error) => {
        console.error('Error processing payment:', error);
        setPaymentStatus('failure');
        toggleModal();
      });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="services-container">
      <h2 style={{ color: "black", }}>Our Services</h2>

      <div className="services-cards-container">
        {serviceImages.map((imageUrl, index) => (
          <div className="service-card" key={index}>
            <img src={imageUrl} alt={`Service ${index + 1}`} />
            <div className="service-info">
              <h2 className='color'>Service {index + 1}</h2>
              <p className="service-price">

                <div className="currency-dropdown">
                  {selectedCurrency === 'USD' ? '$' : '₹'}

                  {convertCurrency(prices[selectedCurrency])}
                  <label htmlFor="currency"> </label>
                  <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
                <p className="service-description">Description of Service {index + 1}.</p>
              </p>
              <hr />

              <ul>
                <li><span className="tick-icon">&#10003;</span> Collect marketing data</li>
                <li><span className="tick-icon">&#10003;</span> Design your emails</li>
                <li><span className="tick-icon">&#10003;</span> Email campaigns & interactions</li>
                <li><span className="tick-icon">&#10003;</span> View your customer's profiles</li>
              </ul>
              <StripeCheckout
                stripeKey={REACT_APP_STRIPE_PUBLISHABLE_KEY}
                token={handleToken}
                amount={convertCurrency(prices[selectedCurrency]) * 100}
                currency={selectedCurrency.toLowerCase()}
              >
                <button className="buy-button">Buy Service</button>
              </StripeCheckout>
            </div>
          </div>
        ))}
      </div>


      {/* <section>
        <div className="container-about">
          <h1>About Us</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem culpa dolores sed unde, provident nobis adipisci in, necessitatibus explicabo, officia a sunt odit iste odio voluptatibus illo numquam distinctio porro. Mollitia, iste odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis facere quasi minima autem dolor, mollitia maxime consequuntur sunt delectus, nobis quos quisquam modi nihil quo qui quis eligendi porro dolores Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore architecto maxime iste consequuntur sit dolor molestiae quos aliquam eos in sapiente minima voluptas, minus unde doloribus ratione perferendis? Fuga laudantium eos eaque doloremque minus veritatis itaque obcaecati aspernatur, ipsum nemo accusantium repellendus consequuntur consequatur voluptate cumque provident earum temporibus adipisci eveniet optio tenetur! Suscipit, ipsum! architecto nostrum! Expedita!</p>
        </div>
      </section> */}

      {/* <footer>
        <p>© 2023 Your Company. All rights reserved.</p>
      </footer> */}

      {/* <div className="currency-dropdown">
        <label htmlFor="currency">Select Currency: </label>
        <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>
      </div> */}

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {paymentStatus === 'success' ? 'Payment Successful' : 'Payment Failed'}
        </ModalHeader>
        <ModalBody>
          {paymentStatus === 'success'
            ? 'Thank you for your payment!'
            : 'Oops! Something went wrong. Please try again.'}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

    </div>
  );
};

export default Services;
