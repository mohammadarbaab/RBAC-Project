// src/api/userApi.js

const BASE_URL = "http://localhost:8080/employe";

export const fetchUsers = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const createUser = async (user) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
