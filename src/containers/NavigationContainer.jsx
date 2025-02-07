import React, { useState } from "react";
import Wrapper from "../components/common/Wrapper/Wrapper";
import Logo from "../assets/icons/logo.svg?react";
import addIcon from "../assets/icons/add.svg";
import DropDown from "../components/form/dropDown/DropDown";
import ActionButton from "../components/navigation/ActionButton";
import Navigation from "../components/navigation/Navigation";
import AddTaskContainer from "./AddTaskContainer";
import { useDispatch, useSelector } from "react-redux";
import { createNewBoard, fetchActiveBoard } from "../store/board-actions";
import Button from "../components/form/button/Button";
import CreateNewBoard from "../components/appSideBar/CreateNewBoard";
import EditDialog from "../components/common/editDialog/EditDialog";
import FormInput1 from "../components/form/input2/FormInput1";

export default function NavigationContainer({ setSearchQuery }) {
  const activeBoard = useSelector((state) => state.board.activeBoard);
  const allBoards = useSelector((state) => state.board.allBoards);
  const [showCreate, setShowCreate] = useState(false);
  const dispatch = useDispatch();
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  let boardsDropdownList = allBoards?.map((item) => ({
    id: item._id,
    value: item.title,
  }));

  const onBoardClickedHandler = (board) => {
    dispatch(fetchActiveBoard(board.id));
  };
  const toggleCreateDialog = () => setShowCreate((prev) => !prev);
  const toggleAddTaskModal = () => setShowAddTaskModal((prev) => !prev);
  const createNewBoardHandler = (boardTitle) => {
    dispatch(createNewBoard({ boardTitle }));
    toggleCreateDialog();
  };

  return (
    <>
      <Navigation>
        <Logo />
        <Wrapper
          width="100%"
          justify="space-between"
          alignItems="center"
          margin="0 0 0 1em"
          minHeight="3rem"
        >
          <DropDown
            dataSource={boardsDropdownList}
            onItemClicked={onBoardClickedHandler}
            shouldHide={true}
            initialValue={activeBoard?.title}
          />
          <FormInput1
              type="text"
              placeholder="Search Task"
              width="30%"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          {activeBoard && (
            <ActionButton
              title="Add new task"
              icon={addIcon}
              handler={toggleAddTaskModal}
            />
          )}
        </Wrapper>
      </Navigation>
      {showAddTaskModal && <AddTaskContainer onClose={toggleAddTaskModal} />}
      {showCreate && (
        <EditDialog
          onClose={toggleCreateDialog}
          onSubmit={createNewBoardHandler}
          title="Enter title for board"
        />
      )}
    </>
  );
}



