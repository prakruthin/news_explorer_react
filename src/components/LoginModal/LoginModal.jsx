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
  const { values, setValues, handleChange } = useForm(defaultValues);
  function handleSubmit(evt) {
    evt.preventDefault();
    onLoginModalSubmit(values);
    setValues(defaultValues);
  }

  return (
    <ModalWithForm
      buttonText={isLoading ? "Logging in..." : "Log in"}
      switchText="or Sign up"
      title="Sign in"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onSwitchForm={onSwitchForm}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
