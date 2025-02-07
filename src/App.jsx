import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import MyBoardsPage from "./pages/MyBoardsPage";
import Wrapper from "./components/common/Wrapper/Wrapper";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAuthDataFromStorage,
  isAuthTokenExpired,
} from "./helpers/auth-helpers";
import authSlice from "./store/auth-slice";
import MyBoardsPageUser from "./pages/MyBoardsPageUser";
import { fetchUsers } from "./store/auth-actions";

function App({ setIsDark }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthDataFromStorage();
    
    if (!isAuthTokenExpired() && token) {
      dispatch(authSlice.actions.login(token));

      dispatch(fetchUsers());
      
      // After login, check user role before redirecting
      const userRole = token.role;
      if (userRole === "admin") {
        navigate("/boards");
      } else if (userRole === "user") {
        navigate("/users-boards");
      }
    } else {
      navigate("/home");
    }
  }, [dispatch, navigate]);

  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/boards"
          element={<MyBoardsPage setIsDark={setIsDark} />}
        />
        <Route
          path="/users-boards"
          element={<MyBoardsPageUser setIsDark={setIsDark} />}
        />
      </Routes>
    </Wrapper>
  );
}

export default App;
