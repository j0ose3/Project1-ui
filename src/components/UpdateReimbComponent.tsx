import React, { SyntheticEvent, useState, useEffect } from "react";
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
import { Reimb } from "../models/reimb";
import { updateReimb, getReimbById, getAllMyReimbs } from "../remote/reimb-service";
import { Link } from "react-router-dom";

interface IUpdateReimbProps {
    authUser: User;
    thisReimb: Reimb;
    setThisReimb: (newReimb: Reimb) => void;
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

function UpdateReimbComponent(props: IUpdateReimbProps) {
    const classes = useStyles();

    const [id] = useState(props.thisReimb.id);
    const [amount, setAmount] = useState(props.thisReimb.amount);
    const [submitted] = useState(props.thisReimb.submitted);
    const [description, setDescription] = useState(props.thisReimb.description);
    const [author] = useState(props.thisReimb.author);
    const [status] = useState(props.thisReimb.status);
    const [type, setType] = useState(props.thisReimb.type);


    let updateAmount = (e: any) => {
        setAmount(e.currentTarget.value);
    };

    let updateDescription = (e: any) => {
        setDescription(e.currentTarget.value);
    };

    let updateType = (e: any) => {
        setType(e.currentTarget.value);
    }

    let update = () => {
        updateReimb(id, amount, description, author, type);
    };

    useEffect(()=> {
        getAllMyReimbs(id);

    },[update]);

    return !props.authUser ||
        props.authUser.role !== "employee" ? (
            <h1>You are not authorized to view this page</h1>
        ) : (
            <>
                <div className={classes.registerContainer}>

                    <form className={classes.registerForm}>

                        <Typography align="center" variant="h6" > Update Reimbursement </Typography>

                        <FormControl margin="normal" fullWidth>

                            <InputLabel htmlFor="id">Id</InputLabel>

                            <Input  id="id" disabled={true} type="text" value={id} />

                        </FormControl>

                        <FormControl margin="normal" fullWidth>

                            <InputLabel htmlFor="amount">Amount</InputLabel>

                            <Input onChange={updateAmount} id="amount" type="text" value={amount} />

                        </FormControl>

                        <FormControl margin="normal" fullWidth>

                            <InputLabel htmlFor="submitted"> Submitted </InputLabel>

                            <Input  id="submitted" disabled={true} type="text" value={submitted} />

                        </FormControl>

                        <FormControl margin="normal" fullWidth>

                            <InputLabel htmlFor="description">Description</InputLabel>

                            <Input onChange={updateDescription} id="description" type="text" value={description} />

                        </FormControl>

                        <FormControl margin="normal" fullWidth>

                            <InputLabel htmlFor="author">Author</InputLabel>

                            <Input  id="author" disabled={true} type="text" value={author} />

                        </FormControl>

                        <FormControl margin="normal" fullWidth>

                            <InputLabel htmlFor="status">Status</InputLabel>

                            <Input  id="status" disabled={true} type="text" value={status} />

                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                            <Select native onChange={updateType} value={type}>
                                <option value={1}>Lodging</option>
                                <option value={2}>Travel</option>
                                <option value={3}>Food</option>
                                <option value={4}>Other</option>
                            </Select>
                        </FormControl>

                        <br /> <br />

                        {

                            <Link to='/myreimbursements' onClick={update} className="btn btn-primary btn-m">Submit</Link>

                        }

                    </form>

                </div>


            </>

        );

}

export default UpdateReimbComponent;