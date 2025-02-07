import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewColumn from "../components/boardView/AddNewColumn";
import BoardView from "../components/boardView/BoardView";
import StatusColumns from "../components/boardView/StatusColumns";
import Wrapper from "../components/common/Wrapper/Wrapper";
import ViewTaskContainer from "./ViewTaskContainer";
import { getUserThemePref } from "../helpers/helpers";
import EditDialog from "../components/common/editDialog/EditDialog";
import EditTaskContainer from "./EditTaskContainer";
import {
  createNewList,
  deleteCard,
  deleteList,
  updateList,
  dragTask,
} from "../store/board-actions";
import ConfirmationModal from "../components/common/deletemodal/ConfirmationModal";
// import { boardActions } from "../store/board-slice";

export default function BoardViewContainer({ tasks, filteredTasks = [] }) {
  const activeBoard = useSelector((state) => state.board.activeBoard);
  const dispatch = useDispatch();
  const [showTask, setShowTask] = useState(false);
  const [showEditTaskDialog, setShowEditTaskDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const isDark = getUserThemePref();
  const [showEdit, setShowEdit] = useState(false);
  const [showCreateList, setShowCreateList] = useState(false);
  const [editingList, setEditingList] = useState(null);
  const statusList = activeBoard?.lists.map((list) => list.title);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [deletePayload, setDeletePayload] = useState(null); // Store payload, NOT function
  const [deleteType, setDeleteType] = useState("");

  const tasksToRender = filteredTasks.length > 0 ? filteredTasks : tasks;

  const taskItemClickHandler = (task) => {
    setCurrentTask(task);
    setShowTask(true);
  };
  const toggleShowEdit = () => setShowEdit(false);
  const toggleShowEditTask = () => setShowEditTaskDialog(false);
  const toggleShowTask = () => setShowTask(false);
  const toggleShowCreateList = () => setShowCreateList(true);

  const taskItemEditHandler = (task) => {
    setCurrentTask(task);
    setShowEditTaskDialog(true);
  };

  const confirmDelete = (message, type, payload) => {
    setConfirmMessage(message);
    setDeleteType(type);
    setDeletePayload(payload);
    setShowConfirmModal(true);
  };

  const taskItemDeleteHandler = (task) => {
    confirmDelete("Are you sure you want to delete this task?", "task", {
      cardId: task._id,
      boardId: task.boardId,
    });
  };
  const listItemEditHandler = (title) => {
    if (activeBoard && editingList) {
      dispatch(
        updateList({ title, listId: editingList.id, boardId: activeBoard._id })
      );
      toggleShowEdit();
    }
  };
  const createNewColumnHandler = (title) => {
    if (activeBoard) {
      dispatch(createNewList({ title, boardId: activeBoard._id }));
      setShowCreateList(false);
    }
  };

  const listItemDeleteHandler = (list) => {
    confirmDelete("Are you sure you want to delete this list?", "list", {
      listId: list.id,
      boardId: activeBoard._id,
    });
  };

  const onListEdit = (list) => {
    setEditingList(list);
    setShowEdit(true);
  };

  const handleDragEnd = (prevListId, newListId, taskId) => {
    if (prevListId !== newListId && activeBoard) {
      dispatch(dragTask({ taskId, prevListId, newListId, boardId: activeBoard._id }));
    }
  };

  return (
    <>
      <Wrapper bgColor={isDark ? "#282836" : "#F3F8FF"} minHeight="100%">
      {activeBoard ? (
        <BoardView>
          <StatusColumns
            dataSource={{
    lists: activeBoard?.lists?.map((list) => ({
      ...list,
      cards: tasksToRender?.filter((task) => task.listId === list._id) || [],
    })) || [],
  }}
            onTaskClick={taskItemClickHandler}
            onTaskEdit={taskItemEditHandler}
            onTaskDelete={taskItemDeleteHandler}
            onListEdit={onListEdit}
            onListDelete={listItemDeleteHandler}
            onDragEnd={handleDragEnd}
          />
          <AddNewColumn onAddColumn={toggleShowCreateList} />
        </BoardView>
      ) : (
          <p>No active board selected.</p>
        )}
      </Wrapper>

      {showTask && currentTask && (
        <ViewTaskContainer
          task={currentTask}
          onClose={toggleShowTask}
          statusList={statusList}
        />
      )}

      {showEdit && editingList && (
        <EditDialog
          onClose={toggleShowEdit}
          onSubmit={listItemEditHandler}
          title="Edit list name"
        />
      )}

      {showCreateList && (
        <EditDialog
          onClose={toggleShowCreateList}
          onSubmit={createNewColumnHandler}
          title="Create new list"
        />
      )}
      {showEditTaskDialog && currentTask && (
        <EditTaskContainer
          task={currentTask}
          onClose={toggleShowEditTask}
        />
      )}
      {console.log("showConfirmModal:", showConfirmModal)} 
    {showConfirmModal && (
      <ConfirmationModal
        message={confirmMessage}
        onConfirm={() => {
          console.log("Executing Delete Action:", deleteType, deletePayload);
          if (deleteType === "task") {
            dispatch(deleteCard(deletePayload));
          } else if (deleteType === "list") {
            dispatch(deleteList(deletePayload));
          }
          setShowConfirmModal(false);
        }}
        onCancel={() => setShowConfirmModal(false)}
      />
    )}
    </>
  );
}
