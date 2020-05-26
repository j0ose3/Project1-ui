import React, { useState, useEffect } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Input,
  makeStyles,
  Button,
  Select,
} from "@material-ui/core";
import { User } from "../models/user";
import { newUser } from "../remote/user-service";
import { Link } from "react-router-dom";

interface IRegisterUserProps {
  authUser: User;
}

const useStyles = makeStyles({
  registerContainer: {
    display: "flex",
    justifyContent: "center",
    margin: 20,
    marginTop: 40,
    padding: 20,
  },
  registerForm: {
    width: "50%",
  },
});

function RegisterUserComponent(props: IRegisterUserProps) {
  const classes = useStyles();

  const [id] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  let newUsername = (e: any) => {
    setUsername(e.currentTarget.value);
  };

  let newPassword = (e: any) => {
    setPassword(e.currentTarget.value);
  };

  let newFname = (e: any) => {
    setFname(e.currentTarget.value);
  };

  let newLname = (e: any) => {
    setLname(e.currentTarget.value);
  };

  let newEmail = (e: any) => {
    setEmail(e.currentTarget.value);
  };

  let newRole = (e: any) => {
    setRole(e.currentTarget.value);
  };

  let create = () => {
    newUser(username, password, fname, lname, email, role);
  };

  return !props.authUser || props.authUser.role !== "admin" ? (
    <h1>You are not authorized to view this page</h1>
  ) : (
    <>
      <div className={classes.registerContainer}>
        <form className={classes.registerForm}>
          <Typography align="center" variant="h6">
            {" "}
            Register User
          </Typography>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>

            <Input
              onChange={newUsername}
              id="username"
              type="text"
              placeholder="Username"
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>

            <Input
              onChange={newPassword}
              id="password"
              type="text"
              placeholder="Password"
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="fname">First Name</InputLabel>

            <Input
              onChange={newFname}
              id="fname"
              type="text"
              placeholder="First Name"
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="lname">Last Name</InputLabel>

            <Input
              onChange={newLname}
              id="lname"
              type="text"
              placeholder="Last Name"
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>

            <Input
              onChange={newEmail}
              id="email"
              type="text"
              placeholder="Email Adress"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="age-native-simple">User Type</InputLabel>
            <Select native onChange={newRole}>
              <option aria-label="None" value="" />
              <option value={"employee"}>User</option>
              <option value={"admin"}>Admin</option>
              <option value={"manager"}>Financial Manager</option>
            </Select>
          </FormControl>
          <br /> <br />
          <Link to="/users" onClick={create} className="btn btn-primary btn-m">
            Submit
          </Link>
        </form>
      </div>
    </>
  );
}

export default RegisterUserComponent;
