import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllBoards from "../components/appSideBar/AllBoards";
import AppSideBar from "../components/appSideBar/AppSideBar";
import CreateNewBoard from "../components/appSideBar/CreateNewBoard";
import SideBarLogo from "../components/appSideBar/SideBarLogo";
import ThemeSwitch from "../components/appSideBar/ThemeSwitch";
import EditDialog from "../components/common/editDialog/EditDialog";
import Wrapper from "../components/common/Wrapper/Wrapper";
import { signOut } from "../store/auth-actions";
import {
  createNewBoard,
  deleteBoard,
  fetchActiveBoard,
  updateBoard,
} from "../store/board-actions";
import ConfirmationModal from "../components/common/deletemodal/ConfirmationModal";

export default function AppSideBarContainer({ setIsDark }) {
  const allBoards = useSelector((state) => state.board.allBoards);
  const [showCreate, setShowCreate] = useState(false);
  const [showEditBoard, setShowEditBoard] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);
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

  const toggleCreateDialog = () => setShowCreate((prev) => !prev);
  const toggleEditDialog = () => setShowEditBoard((prev) => !prev);
  const logoClickHandeler = () => {
    dispatch(signOut());
  };

  const createNewBoardHandler = (boardTitle) => {
    dispatch(createNewBoard({ boardTitle }));
    toggleCreateDialog();
  };

  const editBoardHandler = (board) => {
    setEditingBoard(board);
    toggleEditDialog();
  };

  const deleteBoardHandler = (board) => {
    console.log("Board delete menu clicked:", board);
    setConfirmMessage(`Are you sure you want to delete the board: "${board.title}"?`);
    setDeletePayload({ boardId: board._id });
    setShowConfirmModal(true);
  };

  const confirmBoardDeletion = () => {
    if (deletePayload) {
      console.log("Deleting Board:", deletePayload);
      dispatch(deleteBoard(deletePayload)); 
      setShowConfirmModal(false);
    }
  };


  const submitEditBoardHandler = (boardTitle) => {
    dispatch(updateBoard({ title: boardTitle, boardId: editingBoard._id }));
    toggleEditDialog();
  };

  return (
    <>
      <AppSideBar>
        <Wrapper direction="column">
          <SideBarLogo onClick={logoClickHandeler} />
          <AllBoards
            dataSource={allBoards}
            onBoardClick={changeActiveBoardHandler}
            onBoardEdit={editBoardHandler}
            onBoardDelete={deleteBoardHandler}
          />
          <CreateNewBoard handler={toggleCreateDialog} />
        </Wrapper>
        <Wrapper width="100%">
          <ThemeSwitch onThemeChange={themeHandler} />
        </Wrapper>
      </AppSideBar>
      {showConfirmModal && (
        <ConfirmationModal
          message={confirmMessage}
          onConfirm={confirmBoardDeletion}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
      {showCreate && (
        <EditDialog
          onClose={toggleCreateDialog}
          onSubmit={createNewBoardHandler}
          title="Create new board"
        />
      )}
      {showEditBoard && (
        <EditDialog
          onClose={toggleEditDialog}
          onSubmit={submitEditBoardHandler}
          title="Create new board"
        />
      )}
    </>
  );
}