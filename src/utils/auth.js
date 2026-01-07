// import { baseUrl } from "./constants";
const baseUrl = "http://localhost:3001";
import { checkResponse } from "./api.js";

function register({ email, password, name }) {
  return fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
}

function authorize({ email, password }) {
  return fetch(`${baseUrl}/users?email=${email}&password=${password}`)
    .then(checkResponse)
    .then((users) => {
      if (users.length === 0) {
        return Promise.reject("Invalid email or password");
      }
      return users[0]; // logged-in user
    });
}

// function getUserData(token) {
//   return fetch(`${baseUrl}/users/me`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }).then(checkResponse);
// }

export { register, authorize };
