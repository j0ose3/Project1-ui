import React, { SyntheticEvent, useState } from "react";
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
// import { p1 } from "../remote/project1-client";
import { updateUser } from "../remote/user-service";
import { Link } from "react-router-dom";

interface IUpdateUserProps {
  authUser: User;
  thisUser: User;
  setThisUser: (newUser: User) => void;
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

function UpdateUserComponent(props: IUpdateUserProps) {
  const classes = useStyles();

  const [id] = useState(props.thisUser.id);
  const [username, setUsername] = useState(props.thisUser.username);
  const [password, setPassword] = useState(props.thisUser.password);
  const [fname, setFname] = useState(props.thisUser.fname);
  const [lname, setLname] = useState(props.thisUser.lname);
  const [email, setEmail] = useState(props.thisUser.email);
  const [role, setRole] = useState(props.thisUser.role);

  let updateUsername = (e: any) => {
    setUsername(e.currentTarget.value);
  };

  let updatePassword = (e: any) => {
    setPassword(e.currentTarget.value);
  };

  let updateFname = (e: any) => {
    setFname(e.currentTarget.value);
  };

  let updateLname = (e: any) => {
    setLname(e.currentTarget.value);
  };

  let updateEmail = (e: any) => {
    setEmail(e.currentTarget.value);
  };

  let updateRole = (e: any) => {
    setRole(e.currentTarget.value);
  };

  let update = () => {
    // p1.put('/users', {

    //     id: id,
    //     username: username,
    //     password: password,
    //     firstName: fname,
    //     lastName: lname,
    //     email: email,
    //     role: role
    // });
    updateUser(id, username, password, fname, lname, email, role);
  };

  return !props.authUser ||
    props.authUser.role !== "admin" ||
    props.thisUser.id === 0 ? (
    <h1>You are not authorized to view this page</h1>
  ) : (
    <>
      <div className={classes.registerContainer}>
        <form className={classes.registerForm}>
          <Typography align="center" variant="h6">
            {" "}
            Update User
          </Typography>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>

            <Input
              onChange={updateUsername}
              value={username}
              id="username"
              type="text"
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>

            <Input
              onChange={updatePassword}
              value={password}
              id="password"
              type="text"
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="fname">First Name</InputLabel>

            <Input
              onChange={updateFname}
              value={fname}
              id="fname"
              type="text"
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="lname">Last Name</InputLabel>

            <Input
              onChange={updateLname}
              value={lname}
              id="lname"
              type="text"
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>

            <Input
              onChange={updateEmail}
              value={email}
              id="email"
              type="text"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="age-native-simple">User Type</InputLabel>
            <Select native onChange={updateRole} value={role}>
              <option value={"employee"}>User</option>
              <option value={"admin"}>Admin</option>
              <option value={"manager"}>Financial Manager</option>
            </Select>
          </FormControl>
          <br /> <br />
          <Link to="/users" onClick={update} className="btn btn-primary btn-m">
            Submit
          </Link>
        </form>
      </div>
    </>
  );
}

export default UpdateUserComponent;
