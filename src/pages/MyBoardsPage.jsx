import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotBoardsFound from "../components/boardView/NoBoardsFound";
import Wrapper from "../components/common/Wrapper/Wrapper";
import AppSideBarContainer from "../containers/AppSideBarContainer";
import BoardViewContainer from "../containers/BoardViewContainer";
import NavigationContainer from "../containers/NavigationContainer";
import { fetchAllBoards } from "../store/board-actions";

export default function MyBoardsPage({ setIsDark }) {
  const [searchQuery, setSearchQuery] = useState("");
  const auth = useSelector((state) => state.auth);
  const allBoards = useSelector((state) => state.board.allBoards);
  const activeBoard = useSelector((state) => state.board.activeBoard);
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthed) {
      navigate("/home");
    } else {
      dispatch(fetchAllBoards());
    }
  }, [auth, dispatch, navigate]);

  const tasks = activeBoard?.lists?.flatMap((list) => list.cards) || [];

  const filteredTasks = tasks.filter((task) => {
    const assignedUser = users.find((user) => user.id === task.assignedTo);
    const assignedUserName = assignedUser ? assignedUser.name : "";
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignedUserName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  return (
    <>
      <Wrapper width="100%">
        <AppSideBarContainer setIsDark={setIsDark} />
        <Wrapper width="100%" direction="column" minHeight="1080px">
        <NavigationContainer setSearchQuery={setSearchQuery} />
        {allBoards.length > 0 ? (
          <BoardViewContainer filteredTasks={filteredTasks} />
        ) : (
          <NotBoardsFound />
        )}
      </Wrapper>
      </Wrapper>
    </>
  );
}
