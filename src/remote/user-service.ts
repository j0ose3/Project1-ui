import { p1 } from "./project1-client";
import { User } from "../models/user";

export async function getAllUsers() {
  let res = await p1.get("/users", {
    withCredentials: true,
  });
  return await res.data;
}

export async function newUser(
  username: string,
  password: string,
  fname: string,
  lname: string,
  email: string,
  role: string
) {
  let res = await p1.post("/users", {
    username,
    password,
    fname,
    lname,
    email,
    role,
  });
  return await res.data;
}

export async function updateUser(
  id: number,
  username: string,
  password: string,
  fname: string,
  lname: string,
  email: string,
  role: string
) {
  let res = await p1.put("/users", {
    id,
    username,
    password,
    fname,
    lname,
    email,
    role,
  });
  return await res.data;
}

export async function deleteUser(id: number) {
  return await p1.delete(`/users/${id}`);
}
