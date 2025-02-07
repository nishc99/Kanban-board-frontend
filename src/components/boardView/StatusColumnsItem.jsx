import React from "react";
import MoreOptions from "../common/moreOptions/MoreOptions";
import {
  StatusColumnsListItem,
  StatusColumnsListHeader,
  StatusTitle,
  TaskList,
} from "./styles";
import TaskListItem from "./TaskListItem";
import { dragTask } from "../../store/board-actions";
import { useDispatch, useSelector } from "react-redux";

export default function StatusColumnsItem({
  dataSource,
  onTaskClick,
  onTaskEdit,
  onTaskDelete,
  onListEdit,
  onListDelete,
  onDragEnd,
}) 

{
  const dispatch = useDispatch();
  const activeBoard = useSelector((state) => state.board.activeBoard);

  const listEditHandler = () => {
    onListEdit({ id: dataSource._id, title: dataSource.title });
  };
  const listDeleteHandler = () => {
    onListDelete({ id: dataSource._id, title: dataSource.title });
  };

  // 🔹 Handle Drop
  const handleDrop = (e) => {
    e.preventDefault();

    const taskId = e.dataTransfer.getData("taskId");
    const prevListId = e.dataTransfer.getData("prevListId");
    const newListId = dataSource._id;

    if (prevListId !== newListId) {
      dispatch(dragTask({ taskId, newListId, boardId: activeBoard._id }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  return (
    <StatusColumnsListItem
    onDrop={handleDrop} 
    onDragOver={handleDragOver}
    >
      <StatusColumnsListHeader>
        <StatusTitle>{dataSource.title}</StatusTitle>
        <MoreOptions
          datasource={[
            { title: "Edit", handler: listEditHandler },
            { title: "Delete", handler: listDeleteHandler },
          ]}
        />
      </StatusColumnsListHeader>
      <TaskList>
        {dataSource.cards.map((item) => {
          return (
            <TaskListItem
              key={item._id}
              dataSource={item}
              onTaskClick={onTaskClick}
              onTaskEdit={onTaskEdit}
              onTaskDelete={onTaskDelete}
              draggable 
              onDragStart={(e) => {
              e.dataTransfer.setData("taskId", item._id);
              e.dataTransfer.setData("prevListId", dataSource._id);
            }}
            />
          );
        })}
      </TaskList>
    </StatusColumnsListItem>
  );
}
