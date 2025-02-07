import React, { useEffect, useState } from "react"; 
import ReactDOM from "react-dom";
import Wrapper from "../components/common/Wrapper/Wrapper";
import DropDown from "../components/form/dropDown/DropDown";
import {
  AddTaskPane,
  AddTaskTitle,
  StatusTitle,
} from "../components/addTask/styles";
import FormInput from "../components/form/input/FormInput";
import Button from "../components/form/button/Button";
import FormTextArea from "../components/form/textArea/FormTextArea";
import BackDrop from "../components/common/backDrop/BackDrop";
import { useDispatch, useSelector } from "react-redux";
import { createNewCard } from "../store/board-actions";
import { fetchUsers } from "../store/auth-actions";

export default function AddTaskContainer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const activeBoard = useSelector((state) => state.board.activeBoard);
  const activeBoardList = useSelector((state) => state.board.activeBoardList);
  const [statusOptions, setStatusOptions] = useState([]);
  const users = useSelector((state) => state.auth.users || []);

  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [dueDateInput, setDueDateInput] = useState("");
  const [assignedUser, setAssignedUser] = useState(users[0]?.id || "");
  const [priorityInput, setPriorityInput] = useState("Medium");
  const [statusInput, setStatusInput] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; 
      document.documentElement.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    console.log("Fetching users...");
    dispatch(fetchUsers()); 
  }, [dispatch]);

  useEffect(() => {
    if (!assignedUser && users.length > 0) {
      setAssignedUser(users[0]?.id); 
    }
  }, [users, assignedUser]);

  useEffect(() => {
    if (activeBoard?.lists?.length > 0) {
      const formattedLists = activeBoard.lists.map((list) => ({
        id: list._id,
        value: list.title, 
      }));
      setStatusOptions(formattedLists);
      setStatusInput(formattedLists[0]?.id); 
    }
  }, [activeBoard]);

  const statusChangeHandler = (item) => setStatusInput(item.value);
  const titleChangeHandler = (e) => setTitleInput(e.target.value);
  const descChangeHandler = (e) => setDescInput(e.target.value);
  

  const createTaskHandler = () => {
    const payload = {
      boardId: activeBoard?._id || null, 
      listId: statusInput || null,  
      title: titleInput.trim(),
      description: descInput.trim(),
      dueDate: dueDateInput || null,
      assignedTo: assignedUser || null, 
      priority: priorityInput || "Medium",
      status: statusInput || "todo"
    };
  
    console.log("📤 Sending Task Payload:", payload); 

  if (!payload.boardId || !payload.listId || !payload.assignedTo) {
    console.error("🚨 Invalid data before sending:", payload);
    alert("Please fill all required fields correctly!");
    return;
  }

  dispatch(createNewCard(payload));
  onClose();
};

  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <AddTaskPane>
          <Wrapper
            direction="column"
            alignItems="flex-start"
            justify="flex-start"
            padding="1.75em"
            borderRadius="8px"
            width="100%"
          >
            <AddTaskTitle>Add New Task</AddTaskTitle>
            <FormInput
              label="Title"
              type="text"
              placeholder="e.g. Take coffee break"
              width="100%"
              value={titleInput}
              onChange={titleChangeHandler}
            />
            <FormTextArea
              label="Description"
              type="text"
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
              width="100%"
              minHeight="150px"
              value={descInput}
              onChange={descChangeHandler}
            />
            <FormInput
              label="Due Date"
              type="date"
              width="100%"
              value={dueDateInput}
              onChange={(e) => setDueDateInput(e.target.value)}
            />
            <StatusTitle>Assigned To</StatusTitle>
            <DropDown 
            label="Assigned To" 
            dataSource={users.map(user => ({ id: user.id, value: user.name }))}
            placeholder="Select User" 
            width="100%"
            initialValue={users.find(user => user.id === assignedUser)?.name || "Select User"}
            onItemClicked={(item) => {
            console.log("Selected user:", item); 
            setAssignedUser(item.id);
            }}
            />
            <StatusTitle>Priority</StatusTitle>
            <DropDown 
            label="Priority" 
            dataSource={[
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" }
           ]}
            placeholder="Select Priority"
            width="100%" 
            onItemClicked={(item) => {
              console.log("Selected Priority:", item);
              setPriorityInput(item.id)}} />

            <StatusTitle>Status</StatusTitle>
            <DropDown
            label="Status"
            dataSource={statusOptions}
            placeholder="Select List"
            width="100%"
            onItemClicked={(item) => {
            console.log("📌 Selected List:", item); 
            setStatusInput(item.id);
            }}
            initialValue={statusOptions.length > 0 ? statusOptions[0].value : "Select List"} 
            />

            <Button title="Create Task" onClick={createTaskHandler} />
            <Button title="Cancel" onClick={onClose} />
          </Wrapper>
        </AddTaskPane>,
        document.getElementById("overlay-root")
      )}
    </>
  );
}      
