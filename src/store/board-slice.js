import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeBoard: null,
  activeBoardList: [],
  allBoards: [],
};

const replaceBoards = (state, action) => {
  const boardsList = action.payload.boards;
  return {
    activeBoard: boardsList.length !== 0 ? state.activeBoard : null,
    activeBoardList: boardsList.length !== 0 ? state.activeBoardList : [],
    allBoards: boardsList,
  };
};

const replaceActiveBoardList = (state, action) => {
  return {
    ...state,
    activeBoardList: action.payload,
  };
};

const changeActiveBoard = (state, action) => {
  return {
    ...state,
    activeBoard: action.payload,
  };
};

const dragTask = (state, action) => {
  const { taskId, prevListId, newListId } = action.payload;

  const board = state.allBoards.find((board) => board.id === state.activeBoard);
  if (!board) return;

  const prevList = board.lists.find((list) => list._id === prevListId);
  const newList = board.lists.find((list) => list._id === newListId);

  if (!prevList || !newList) return;

  const taskIndex = prevList.cards.findIndex((task) => task._id === taskId);
  if (taskIndex === -1) return;

  const task = prevList.cards.splice(taskIndex, 1)[0]; 
  newList.cards.push(task); 
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    changeActiveBoard,
    replaceBoards(state, action) {
      state.allBoards = action.payload || [];
    },
    setActiveBoard(state, action) {
      state.activeBoard = action.payload || { lists: [] };
    },
    replaceActiveBoardList,
    dragTask,
  },
});

export const boardActions = boardSlice.actions;
export default boardSlice;

