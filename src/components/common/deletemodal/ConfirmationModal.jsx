import React from "react";
import ReactDOM from "react-dom";
import BackDrop from "../backDrop/BackDrop";
import Wrapper from "../Wrapper/Wrapper";
import Button from "../../form/button/Button";


export default function ConfirmationModal({ message, onConfirm, onCancel }) {
    return (
      <>
        {console.log("Confirmation Modal Rendered")} 
        {ReactDOM.createPortal(
          <BackDrop onClick={onCancel} />,
          document.getElementById("backdrop-root")
        )}
        {ReactDOM.createPortal(
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999, 
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              border: "3px solid red",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Confirmation</h3>
            <p>{message}</p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button
                onClick={() => {
                  console.log("Cancel clicked"); 
                  onCancel();
                }}
                style={{ padding: "10px", marginRight: "10px" }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Delete clicked"); 
                  onConfirm();
                  onCancel();
                }}
                style={{ padding: "10px", background: "red", color: "white", cursor: "pointer" }}
              >
                Delete
              </button>
            </div>
          </div>,
          document.getElementById("overlay-root")
        )}
    </>
  );
}
