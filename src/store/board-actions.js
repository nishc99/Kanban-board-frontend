import axios from "axios";
import { Routes } from "../constants/constants";
import { getTokenFromStorage } from "../helpers/auth-helpers";
import { boardActions } from "./board-slice";

export const createNewBoard = (title) => {
  return async (dispatch) => {
    const createBoardHandler = async () => {
      return await axios.post(Routes.BOARD, title, {
        headers: { Authorization: "Bearer " + getTokenFromStorage() },
      });
    };
    try {
      const response = await createBoardHandler();
      dispatch(fetchAllBoards());
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateBoard = (payload) => {
  console.log(payload);
  return async (dispatch) => {
    const updateHandler = async () => {
      return await axios.put(
        Routes.BOARD + payload.boardId,
        { title: payload.title },
        {
          headers: { Authorization: "Bearer " + getTokenFromStorage() },
        }
      );
    };
    try {
      const response = await updateHandler();
      dispatch(fetchAllBoards());
    } catch (err) {
      console.log(err);
    }
  };
};


export const deleteBoard = (payload) => {
  return async (dispatch) => {
    const deleteHandler = async () => {
      return await axios.delete(Routes.BOARD + payload.boardId, {
        headers: { Authorization: "Bearer " + getTokenFromStorage() },
      });
    };
    try {
      const response = await deleteHandler();
      dispatch(fetchAllBoards());
    } catch (err) {
      console.log(err);
    }
  };
};


export const createNewList = (payload) => {
  return async (dispatch) => {
    const createListHandler = async () => {
      return await axios.post(Routes.LIST, payload, {
        headers: { Authorization: "Bearer " + getTokenFromStorage() },
      });
    };
    try {
      const response = await createListHandler();
      dispatch(fetchActiveBoard(payload.boardId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateList = (payload) => {
  console.log(payload);
  return async (dispatch) => {
    const updateListHandler = async () => {
      return await axios.put(Routes.LIST, payload, {
        headers: { Authorization: "Bearer " + getTokenFromStorage() },
      });
    };
    try {
      const response = await updateListHandler();
      dispatch(fetchActiveBoard(payload.boardId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteList = (payload) => {
  return async (dispatch) => {
    const deleteListHandler = async () => {
      return await axios.delete(Routes.LIST + payload.listId, {
        headers: { Authorization: "Bearer " + getTokenFromStorage() },
      });
    };
    try {
      const response = await deleteListHandler();
      dispatch(fetchActiveBoard(payload.boardId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteCard = (payload) => {
  return async (dispatch) => {
    const deleteCardHandler = async () => {
      return await axios.delete(Routes.CARD + payload.cardId, {
        headers: { Authorization: "Bearer " + getTokenFromStorage() },
      });
    };
    try {
      const response = await deleteCardHandler();
      dispatch(fetchActiveBoard(payload.boardId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchActiveBoard = (boardId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${Routes.BOARD}${boardId}`, {
        headers: { Authorization: "Bearer " + getTokenFromStorage() },
      });

      // Ensure lists are defined in the response
      const board = response.data;
      if (!board.lists) board.lists = []; // Prevent undefined error

      dispatch(boardActions.setActiveBoard(board));
    } catch (err) {
      console.error("Error fetching active board:", err);
    }
  };
};

export const fetchAllBoards = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(Routes.BOARD, {
        headers: { Authorization: "Bearer " + getTokenFromStorage() },
      });

      if (!response.data.boards) {
        throw new Error("Boards data is undefined");
      }

      dispatch(boardActions.replaceBoards(response.data.boards || []));
    } catch (err) {
      console.error("Error fetching boards:", err);
    }
  };
};

export const updateCardData = (payload) => {
  return async (dispatch) => {
    const updateHandler = async () => {
      const response = await axios.put(
        Routes.CARD,
        {
          title: payload.title,
          description: payload.description,
          listId: payload.listId,
          cardId: payload._id,
          assignedTo: payload.assignedTo,
          priority: payload.priority,
          dueDate: payload.dueDate,
          status: payload.status || payload.listId,
        },
        {
          headers: { Authorization: "Bearer " + getTokenFromStorage() },
        }
      );
      if (response.status === 200) {
        console.log("Card updated successfully!");
      }
    };

    try {
      await updateHandler();
      dispatch(fetchActiveBoard(payload.boardId));
    } catch (err) {
      console.error("Error updating card:", err);
    }
  };
};


export const dragTask = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${Routes.CARD}/${payload.taskId}/move`,
        { newListId: payload.newListId },
        {
          headers: { Authorization: "Bearer " + getTokenFromStorage() },
        }
      );

      if (response.status === 200) {
        dispatch(fetchActiveBoard(payload.boardId));
      }
    } catch (error) {
      console.log("Error in dragging task:", error);
    }
  };
};



export const createNewCard = (payload) => {
  return async (dispatch) => {
    try {
      await axios.post(Routes.CARD, payload, {
        headers: { Authorization: "Bearer " + getTokenFromStorage() },
      });
      dispatch(fetchActiveBoard(payload.boardId));
    } catch (error) {
      console.log(error);
    }
  };
};

