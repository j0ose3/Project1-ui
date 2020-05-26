import React, { useEffect, useState } from "react";
import { User } from "../models/user";
import { getAllUsers, deleteUser } from "../remote/user-service";
import { Link } from "react-router-dom";

interface IUserProps {
  authUser: User;
  setThisUser: (user: User) => void;
}

const UserComponent = (props: IUserProps) => {
  const [usersState, setUsersState] = useState([] as User[]);

  let users: any[] = [];

  useEffect(() => {
    let fetchData = async () => {
      const response = await getAllUsers();

      for (let user of response) {
        users.push(
          <tr>
            <td>{user.id}</td>
            <td>{user.fname}</td>
            <td>{user.lname}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>

            {user.role === "admin" ? (
              <td>Admin</td>
            ) : user.role === "manager" ? (
              <td>Financial Manager</td>
            ) : (
                  <td>User</td>
                )}

            <td>
              <Link
                to="/updateuser"
                onClick={() => {props.setThisUser(
                  new User(
                      user.id,
                      user.username,
                      user.password,
                      user.fname,
                      user.lname,
                      user.email,
                      user.role
                    )
                  );
                }}
                className="btn btn-primary btn-m"
              >
                Update
              </Link>
            </td>

            <td>
              <Link
                to="/users"
                onClick={async () => {
                  await deleteUser(user.id);
                }}
                className="btn btn-primary btn-m"
              >
                Delete
              </Link>
            </td>
          </tr>
        );
      }
      setUsersState(users);
    };

    fetchData();
  }, [props.setThisUser, deleteUser]);

  return !props.authUser || props.authUser.role !== "admin" ? (
    <>
      <h1>Youre not authorized to view this page</h1>
    </>
  ) : (
      <>
        <h1>User Component</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>

          <tbody>{usersState}</tbody>
        </table>
      </>
    );
};

export default UserComponent;
