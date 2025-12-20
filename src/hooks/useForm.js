// import { useState } from "react";

// export function useForm(defaultValues) {
//   const [values, setValues] = useState(defaultValues);

//   function handleChange(evt) {
//     const { name, value } = evt.target;
//     setValues({ ...values, [name]: value });
//   }

//   function resetForm() {
//     setValues(defaultValues);
//   }

//   return { values, setValues, handleChange };
// }

// import { useState, useCallback } from "react";

// export function useForm(initialValues) {
//   const [values, setValues] = useState(initialValues);
//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   const handleChange = useCallback((evt) => {
//     const { name, value, validationMessage } = evt.target;

//     setValues((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: validationMessage,
//     }));

//     setIsValid(evt.target.closest("form").checkValidity());
//   }, []);

//   const resetForm = useCallback(
//     (newValues = initialValues) => {
//       setValues(newValues);
//       setErrors({});
//       setIsValid(false);
//     },
//     [initialValues]
//   );

//   return {
//     values,
//     setValues,
//     handleChange,
//     errors,
//     isValid,
//     resetForm,
//   };
// }
import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const { name, value, validationMessage } = evt.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));
    setIsValid(evt.target.closest("form").checkValidity());
  }

  function resetForm() {
    setValues(defaultValues);
    setErrors({});
    setIsValid(false);
  }

  return {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    resetForm,
  };
}
