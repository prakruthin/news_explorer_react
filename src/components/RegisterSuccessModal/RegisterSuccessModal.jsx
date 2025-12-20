import "./RegisterSuccessModal.css";
import close from "../../assets/close.svg";

function RegisterSuccessModal({ isOpen, onClose, handleLogin }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_register-success">
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img src={close} alt="Close" className="modal__close-icon" />
        </button>
        <p className="modal__title modal__title_type_register-success">
          Registration successfully completed!
        </p>

        <button
          className="modal__button modal__button_type_signin"
          type="button"
          onClick={handleLogin}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegisterSuccessModal;
