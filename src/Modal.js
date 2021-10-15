import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { questions, closeModal, isModalOpen, correct } = useGlobalContext();
  const percentage = (correct / questions.length) * 100;
  const salute = percentage >= 50 ? "Congrats🔥" : "Oh No..😢";
  return (
    <>
      <div
        className={`${
          isModalOpen ? "modal-container isOpen" : "modal-container"
        }`}
      >
        <div className="modal-content">
          <h2 style={{ color: "orange" }}>{salute}</h2>
          <p>You have answered {percentage}% of the questions correctly😎.</p>
          <button className="close-btn" onClick={closeModal}>
            Play Again
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
