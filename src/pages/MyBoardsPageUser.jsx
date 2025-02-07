import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotBoardsFound from "../components/boardView/NoBoardsFound";
import Wrapper from "../components/common/Wrapper/Wrapper";
import BoardViewContainer from "../containers/BoardViewContainer";
import { fetchAllBoards } from "../store/board-actions";
import AppSideBarContainerUser from "../containers/AppSideBarContainerUser";
import NavigationContainerUser from "../containers/NavigationContainerUser";

export default function MyBoardsPageUser({ setIsDark }) {
  const [searchQuery, setSearchQuery] = useState("");
  const auth = useSelector((state) => state.auth);
  const allBoards = useSelector((state) => state.board.allBoards);
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

  const tasks = allBoards
  .flatMap((board) =>
    board.lists.flatMap((list) =>
      list.cards.filter((task) => task.assignedTo === auth.userId)
    )
  ) || [];

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
        <AppSideBarContainerUser setIsDark={setIsDark} />
        <Wrapper width="100%" direction="column" minHeight="1080px">
                <NavigationContainerUser setSearchQuery={setSearchQuery} />
                {allBoards.length > 0 ? (
                  <BoardViewContainer filteredTasks={filteredTasks} tasks={tasks} />
                ) : (
                  <NotBoardsFound />
                )}
        </Wrapper>
      </Wrapper>
    </>
  );
}