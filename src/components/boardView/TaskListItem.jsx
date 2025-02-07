import React, { useState } from "react";
import Card from "../common/Card/Card";
import CardTitle from "../common/Card/CardTitle";
import CardSubTitle from "../common/Card/CardSubTitle";
import { TaskListItemTitle } from "./styles";
import MoreOptions from "../common/moreOptions/MoreOptions";
import { useSelector } from "react-redux";

export default function TaskListItem({
  dataSource,
  onTaskClick,
  onTaskEdit,
  onTaskDelete,
}) {
  const users = useSelector((state) => state.auth.users);
  const activeBoardList = useSelector((state) => state.board.activeBoardList);

  const assignedUserObj = users.find((user) => user.id === dataSource.assignedTo);

  const assignedUserName = assignedUserObj ? assignedUserObj.name : "N/A";


  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", dataSource._id);
    e.dataTransfer.setData("prevListId", dataSource.listId);
  };

  const onClickHandler = () => {
    onTaskClick(dataSource);
  };

  const taskEditHandler = (e) => {
    e.stopPropagation();
    onTaskEdit(dataSource);
  };

  const taskDeleteHandler = (e) => {
    e.stopPropagation();
    onTaskDelete(dataSource);
  };

  return (
    <Card width="320px" onClick={onClickHandler}
    draggable
    onDragStart={handleDragStart}
    >
      <TaskListItemTitle>
        <CardTitle>{dataSource.title}</CardTitle>
        <MoreOptions
          datasource={[
            { title: "Edit", handler: taskEditHandler },
            { title: "Delete", handler: taskDeleteHandler },
          ]}
        />
      </TaskListItemTitle>
      <CardSubTitle>
        Assigned To: {assignedUserName}
        <br/> 
         Priority: {dataSource.priority}
      </CardSubTitle>
    </Card>
  );
}




