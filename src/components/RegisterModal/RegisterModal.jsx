import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  onClose,
  isOpen,
  onRegisterModalSubmit,
  onSwitchForm,
  isLoading,
}) {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    avatar: "",
  };
  const { values, setValues, handleChange } = useForm(defaultValues);
  function handleSubmit(evt) {
    evt.preventDefault();
    onRegisterModalSubmit(values);
    setValues(defaultValues);
  }

  return (
    <ModalWithForm
      buttonText={isLoading ? "Saving..." : "Next"}
      switchText="or Log in"
      title="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onSwitchForm={onSwitchForm}
    >
      <label htmlFor="userEmail" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="userEmail"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="userPassword" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="userPassword"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
      <label htmlFor="userName" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="userName"
          placeholder="Name"
          required
          onChange={handleChange}
          value={values.name}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
