import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { User } from "./models/user";
import { Reimb } from  "./models/reimb";

import HomeComponent from "./components/HomeComponent";
import LoginComponent from "./components/LoginComponent";
import NavbarComponent from "./components/NavbarComponent";

import UserComponent from "./components/UserComponent";
import UpdateUserComponent from "./components/UpdateUserComponent";
import RegisterUserComponent from "./components/RegisterUserComponent";

import ReimbComponent from "./components/ReimbComponent";
import ReimbDetailsComponent from "./components/ReimbDetailsComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import UpdateReimbComponent from "./components/UpdateReimbComponent";
import NewReimbComponent from "./components/NewReimbComponent";

function App() {
  //@ts-ignore
  const [authUser, setAuthUser] = useState(null as User);
  //@ts-ignore
  const [thisUser, setThisUser] = useState(new User(0, "", "", "", "", "", 0));

  const [thisReimb, setThisReimb] = useState(new Reimb(0, 0, new Date, new Date, '', 0, 0, 0, 0));

  return (
    <>
      <Router>
        <AppBar color="primary" position="static">
          <Toolbar>
            <Typography variant="h5" color="inherit">
              <NavbarComponent authUser={authUser} setAuthUser={setAuthUser} />
            </Typography>
          </Toolbar>
        </AppBar>

        <Switch>

          <Route path = "/login" render = {() => <LoginComponent authUser = {authUser} setAuthUser = {setAuthUser}/>}/>
          <Route path = "/home" render = {() => <HomeComponent authUser = {authUser}/>}/>
          <Route path = "/users" render = {() => <UserComponent authUser = {authUser} setThisUser = {setThisUser}/>}/>
          <Route path = "/updateuser" render = {() => <UpdateUserComponent authUser = {authUser} thisUser = {thisUser} setThisUser = {setThisUser} />}/>
          <Route path = "/reimbursements" render = {() => <ReimbComponent authUser = {authUser} setThisReimb = {setThisReimb}/>}/>
          <Route path = "/myreimbursements" render = {() => <EmployeeComponent authUser = {authUser} setThisReimb = {setThisReimb}/>}/>
          <Route path = "/register" render = {() => <RegisterUserComponent authUser = {authUser}/>}/>
          <Route path = {`/reimbursementdetails-${thisReimb.id}`} render = {() => <ReimbDetailsComponent authUser = {authUser} thisReimb = {thisReimb}/>}/>
          <Route path = "/updatereimbursement" render = {() => <UpdateReimbComponent authUser = {authUser} thisReimb = {thisReimb} setThisReimb = {setThisReimb}/>}/>
          <Route path = "/newreimbursement" render = {() => <NewReimbComponent authUser = {authUser} thisReimb = {thisReimb}/>}/>

        </Switch>
      </Router>
    </>
  );
}

export default App;
