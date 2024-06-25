import React from "react";
import './success.css';
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate()

  return (
    <div className="thankyou">
      <div className="second">
        <h1>Thank you</h1>
        <p>Your payment has been successfully processed. Thank you for your purchase!</p>
        <button onClick={() => navigate('/')}>Back to the HomePage</button>
      </div>
    </div>
  );
}

export default Success;
