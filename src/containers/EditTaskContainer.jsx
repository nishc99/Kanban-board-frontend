import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Wrapper from "../components/common/Wrapper/Wrapper";
import DropDown from "../components/form/dropDown/DropDown";
import {
  EditTaskPane,
  EditTaskTitle,
  StatusTitle,
} from "../components/editTask/styles";
import FormInput from "../components/form/input/FormInput";
import Button from "../components/form/button/Button";
import FormTextArea from "../components/form/textArea/FormTextArea";
import BackDrop from "../components/common/backDrop/BackDrop";
import { useDispatch, useSelector } from "react-redux";
import { updateCardData } from "../store/board-actions";
import { fetchUsers } from "../store/auth-actions";

export default function EditTaskContainer({ onClose, task }) {
  const dispatch = useDispatch();

  const activeBoard = useSelector((state) => state.board.activeBoard);
  const users = useSelector((state) => state.auth.users || []);

  const [statusOptions, setStatusOptions] = useState([]);
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    dueDate: task?.dueDate?.substring(0, 10) || "",
    assignedTo: task?.assignedTo?.id || "", 
    priority: task?.priority || "Medium",
    status: task?.status || task?.listId || "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  
  useEffect(() => {
    if (users.length > 0) {
      const assignedUser = users.find((u) => u.id === task.assignedTo);
      setFormData((prev) => ({
        ...prev,
        assignedTo: assignedUser ? assignedUser._id : users[0]._id, 
      }));
    }
  }, [users, task]);
  

  useEffect(() => {
    console.log("Updated Assigned User:", formData.assignedTo);
  }, [formData.assignedTo]);

  useEffect(() => {
    if (activeBoard?.lists?.length > 0) {
      const formattedLists = activeBoard.lists.map((list) => ({
        id: list._id,
        value: list.title,
      }));
      setStatusOptions(formattedLists);

      setFormData((prev) => ({
        ...prev,
        status: formattedLists.find((list) => list.id === task?.listId)?.id || formattedLists[0]?.id,
      }));
    }
  }, [activeBoard, task?.listId]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const editTaskHandler = () => {
    console.log("Final Form Data:", formData);

    if (!formData.assignedTo || formData.assignedTo === "") {
      console.error("🚨 Assigned user is missing!");
      alert("Please select an assigned user.");
      return;
    }

    const updatedTask = {
      ...formData,
      _id: task._id,
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate || null,
      assignedTo: formData.assignedTo, 
      priority: formData.priority || "Medium",
      listId: formData.status || task.listId,
      boardId: task.boardId,
    };

    console.log("Updating Task Payload:", updatedTask);

    if (!updatedTask.boardId || !updatedTask.listId || !updatedTask.assignedTo) {
      console.error("🚨 Invalid task data:", updatedTask);
      alert("Please fill all required fields correctly!");
      return;
    }

    dispatch(updateCardData(updatedTask));
    onClose();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <EditTaskPane>
          <Wrapper direction="column" alignItems="flex-start" justify="flex-start" padding="1.75em" borderRadius="8px" width="100%">
            <EditTaskTitle>Edit Task</EditTaskTitle>

            <FormInput label="Title" type="text" placeholder="Task title" width="100%" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} />
            <FormTextArea label="Description" type="text" placeholder="Task description" width="100%" minHeight="150px" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} />
            <FormInput label="Due Date" type="date" width="100%" value={formData.dueDate} onChange={(e) => handleInputChange("dueDate", e.target.value)} />

            
            <StatusTitle>Assigned To</StatusTitle>
            <DropDown 
              label="Assigned To"
              dataSource={users.map(user => ({ id: user.id, value: user.name }))}
              placeholder="Select User"
              width="100%"
              onItemClicked={(item) => {
                console.log("User Selected:", item);
                setFormData((prev) => ({
                  ...prev,
                  assignedTo: item.id,  
                }));
              }}
              initialValue={
                users.find((user) => user.id === formData.assignedTo)?.name || "Select User"
              }
            />

            
            <StatusTitle>Priority</StatusTitle>
            <DropDown 
              label="Priority"
              dataSource={[
                { id: "High", value: "High" },
                { id: "Medium", value: "Medium" },
                { id: "Low", value: "Low" }
              ]}
              placeholder="Select Priority"
              width="100%"
              onItemClicked={(item) => handleInputChange("priority", item.id)}
              initialValue={formData.priority}
            />

            
            <StatusTitle>Status</StatusTitle>
            <DropDown
              label="Status"
              dataSource={statusOptions}
              placeholder="Select List"
              width="100%"
              onItemClicked={(item) => handleInputChange("status", item.id)}
              initialValue={statusOptions.find((list) => list.id === formData.status)?.value || "Select List"}
            />

            <Button title="Submit" onClick={editTaskHandler} />
            <Button title="Cancel" onClick={onClose} />
          </Wrapper>
        </EditTaskPane>,
        document.getElementById("overlay-root")
      )}
    </>
  );
}






