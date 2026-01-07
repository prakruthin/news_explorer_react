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
  };
  // const { values, setValues, handleChange } = useForm(defaultValues);
  const { values, handleChange, setValues, errors, isValid } =
    useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegisterModalSubmit(values);
    setValues(defaultValues);
  }

  return (
    <ModalWithForm
      buttonText={isLoading ? "Saving..." : "Sign up"}
      switchText="Sign in"
      title="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onSwitchForm={onSwitchForm}
      isValid={isValid}
      isLoading={isLoading}
    >
      <label htmlFor="userEmail" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          id="userEmail"
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
      <label htmlFor="userPassword" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className={`modal__input ${
            errors.password ? "modal__input_error" : ""
          }`}
          id="userPassword"
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
      <label htmlFor="userName" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          // className="modal__input"
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          id="userName"
          placeholder="Name"
          required
          onChange={handleChange}
          value={values.name}
        />
        {/* <span className="modal__error">{errors.name}</span> */}
        <span
          className={`modal__error ${
            errors.name && isOpen ? "modal__error_visible" : ""
          }`}
        >
          {errors.name}
        </span>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
