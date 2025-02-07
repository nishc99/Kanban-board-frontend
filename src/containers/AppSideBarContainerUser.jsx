import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppSideBar from "../components/appSideBar/AppSideBar";
import SideBarLogo from "../components/appSideBar/SideBarLogo";
import ThemeSwitch from "../components/appSideBar/ThemeSwitch";
import Wrapper from "../components/common/Wrapper/Wrapper";
import { signOut } from "../store/auth-actions";
import {
  deleteBoard,
  fetchActiveBoard,
  updateBoard,
} from "../store/board-actions";
import ConfirmationModal from "../components/common/deletemodal/ConfirmationModal";
import AllBoardsUser from "../components/appSideBar/AllBoardsUser";

export default function AppSideBarContainerUser({ setIsDark }) {
  const allBoards = useSelector((state) => state.board.allBoards);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [deletePayload, setDeletePayload] = useState(null);

  const dispatch = useDispatch();
  const changeActiveBoardHandler = (boardId) => {
    dispatch(fetchActiveBoard(boardId));
  };
  const themeHandler = () => {
    setIsDark((prev) => !prev);
  };

  const logoClickHandeler = () => {
    dispatch(signOut());
  };

  return (
    <>
      <AppSideBar>
        <Wrapper direction="column">
          <SideBarLogo onClick={logoClickHandeler} />
          <AllBoardsUser
            dataSource={allBoards}
            onBoardClick={changeActiveBoardHandler}
          />
        </Wrapper>
        <Wrapper width="100%">
          <ThemeSwitch onThemeChange={themeHandler} />
        </Wrapper>
      </AppSideBar>
    </>
  );
}