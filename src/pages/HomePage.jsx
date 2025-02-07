import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeContainer from "../containers/HomeContainer";
import { getAuthToken, signUp } from "../store/auth-actions";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupHandler = (data, resetForm) => {
    dispatch(
      signUp(data, (response) => {
        resetForm();
        if (response?.role === "admin") {
          navigate("/boards"); // Redirect to Admin board
        } else {
          navigate("/users-boards"); // Redirect to User board
        }
      })
    );
  };

  const signinHandler = (data) => {
    dispatch(
      getAuthToken(data, (userData) => {
        const role = userData?.role;
        if (role === "admin") {
          navigate("/boards");
        } else if (role === "user") {
          navigate("/users-boards");
        } else {
          // Fallback in case role is undefined or unexpected
          navigate("/"); // Or show an error page
        }
      })
    );
  };

  return (
    <>
      <HomeContainer onSignup={signupHandler} onSignin={signinHandler} />
    </>
  );
}

