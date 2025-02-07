import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import BackDrop from "../components/common/backDrop/BackDrop";
import Wrapper from "../components/common/Wrapper/Wrapper";
import DropDown from "../components/form/dropDown/DropDown";
import Button from "../components/form/button/Button";

import {
  ViewTaskPane,
  TaskTitle,
  TaskDescription,
  DueDate,
  AssignedTo,
  PriorityStat,
  StatusTitle,
} from "../components/viewTask/styles";

export default function ViewTaskContainer({ task, onClose, statusList }) {
  const activeBoard = useSelector((state) => state.board.activeBoard);
  const users = useSelector((state) => state.auth.users);

  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const assignedUserObj = users.find((user) => user.id === task.assignedTo);

  const assignedUserName = assignedUserObj ? assignedUserObj.name : "N/A";

  const list = activeBoard?.lists?.find((list) => String(list._id) === String(task.listId));
  
  const listName = list ? list.title : "N/A";

  useEffect(() => {
    setStatus(list);
  }, [activeBoard, task.listId]);

  const statusChangeHandler = (status) => {
    setStatus(status);
  };

  const exportTaskToCSV = (task) => {
    const csvContent = [
      ["Title", "Description", "Due Date", "Assigned To", "Priority", "Status"],
      [
        task.title,
        task.description,
        new Date(task.dueDate).toLocaleDateString(),
        assignedUserName,
        task.priority,
        listName,
      ],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${task.title.replace(/\s+/g, "_")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ViewTaskPane>
          <Wrapper
            direction="column"
            alignItems="flex-start"
            justify="flex-start"
            padding="1.75em"
            borderRadius="8px"
            width="100%"
          >
            <TaskTitle><strong>Title: </strong>{task.title}</TaskTitle>
            <TaskDescription><strong>Description: </strong>{task.description}</TaskDescription>
            <DueDate><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</DueDate>
            <AssignedTo><strong>Assigned To:</strong> {assignedUserName}</AssignedTo>
            <PriorityStat><strong>Priority:</strong> {task.priority}</PriorityStat>
            <StatusTitle><strong>Status:</strong> {listName} </StatusTitle>
            <Button title="Export to CSV" onClick={() => exportTaskToCSV(task)} />
          </Wrapper>
        </ViewTaskPane>,
        document.getElementById("overlay-root")
      )}
    </>
  );
}


