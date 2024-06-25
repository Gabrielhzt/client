import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateCart } from "../features/cart/cartSlice";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectStatus = searchParams.get("redirect_status");

  useEffect(() => {
    if (redirectStatus === "succeeded") {
      dispatch(validateCart());
    }
  }, [dispatch, redirectStatus]);

  return (
    <div className="thankyou">
      <div className="second">
        <h1>Thank you</h1>
        <p>Your payment has been successfully processed. Thank you for your purchase!</p>
        <button onClick={() => navigate("/")}>Back to the HomePage</button>
      </div>
    </div>
  );
};

export default Success;
