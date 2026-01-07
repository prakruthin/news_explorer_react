// import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  onClose,
  isOpen,
  onLoginModalSubmit,
  onSwitchForm,
  isLoading,
}) {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, setValues, errors, isValid } =
    useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLoginModalSubmit(values);
    setValues(defaultValues);
  }

  return (
    <ModalWithForm
      buttonText={isLoading ? "Signing in..." : "Sign in"}
      switchText="Sign up"
      title="Sign in"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onSwitchForm={onSwitchForm}
      isValid={isValid}
      isLoading={isLoading}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          // className="modal__input"
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          id="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
        <span
          className={`modal__error ${
            errors.email && isOpen ? "modal__error_visible" : ""
          }`}
        >
          {errors.email}
        </span>
      </label>

      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          // className="modal__input"
          className={`modal__input ${
            errors.password ? "modal__input_error" : ""
          }`}
          id="password"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
        <span
          className={`modal__error ${
            errors.password && isOpen ? "modal__error_visible" : ""
          }`}
        >
          {errors.password}
        </span>
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
