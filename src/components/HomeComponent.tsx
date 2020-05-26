import React, { SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";
import { getAllReimbs } from "../remote/reimb-service";
import { User } from "../models/user";

interface IHomeProps {
  authUser: User;
}

const useStyles = makeStyles({
  homeContainer: {
    display: "flex",
    justifyContent: "center",
  },
});

const HomeComponent = (props: IHomeProps) => {
  const classes = useStyles();

  let getReimbs = async (e: SyntheticEvent) => {
    console.log(await getAllReimbs());
  };

  let printAuthUser = () => {
    console.log(props.authUser);
  };

  return !props.authUser.username ? (
    <Redirect to="/login" />
  ) : (
    <>
      <div>
        <div className={classes.homeContainer}>
          <h1>Welcome, {props.authUser.username}</h1>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
