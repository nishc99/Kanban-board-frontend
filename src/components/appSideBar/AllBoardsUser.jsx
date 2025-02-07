import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Wrapper from "../common/Wrapper/Wrapper";
import { BoardTitle, BoardList } from "./styles";
import BoardItemUser from "./BoardItemUser";
export default function AllBoardsUser({
  dataSource,
  onBoardClick,
}) {
  const activeBoard = useSelector((state) => state.board.activeBoard);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    setCurrent(activeBoard);
  }, [activeBoard]);

  const boardItems = dataSource.map((item) => {
    return (
      <BoardItemUser
        key={item._id}
        board={item}
        isActive={current?._id === item._id}
        onClick={onBoardClick.bind(null, item._id)}
      />
    );
  });
  return (
    <Wrapper direction="column" margin="1em 0 0 0">
      <BoardTitle>{`All boards (${dataSource.length})`}</BoardTitle>
      <BoardList>{boardItems}</BoardList>
    </Wrapper>
  );
}
