import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Typography, FormControl, InputLabel, Input, makeStyles, Button, Select } from '@material-ui/core';
import { User } from '../models/user';
import { Reimb } from '../models/reimb';
import { Link } from 'react-router-dom';
import { addNewReimb } from '../remote/reimb-service';

export interface INewReimbProps {
    authUser: User;
    thisReimb: Reimb;
}

const useStyles = makeStyles({
    registerContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    registerForm: {
        width: "50%"
    }
});

function NewReimbComponent(props: INewReimbProps) {

    const classes = useStyles();

    const [amount, setAmount] = useState(props.thisReimb.amount);
    const [description, setDescription] = useState(props.thisReimb.description);
    const [author] = useState(props.authUser.id);
    const [type, setType] = useState(props.thisReimb.type);

    let updateAmount = (e: any) => {
        setAmount(e.currentTarget.value);
    }

    let updateDescription = (e: any) => {
        setDescription(e.currentTarget.value);
    }

    let updateType = (e: any) => {
        setType(e.currentTarget.value);
    }

    let createReimb = (e: SyntheticEvent) => {
        addNewReimb(amount, description, author, type);
    }

    useEffect(() => {

    }, [createReimb])

    return (

        !props.authUser ?

            <h1>Please login to view this page</h1>

            :

            <>

                <div className={classes.registerContainer}>

                    <form className={classes.registerForm}>

                        <Typography align="center" variant="h6" > New Reimbursement </Typography>

                        <FormControl margin="normal" fullWidth>

                            <InputLabel htmlFor="amount">Amount</InputLabel>

                            <Input onChange={updateAmount} id="amount" type="text" placeholder="Amount" />

                        </FormControl>

                        <FormControl margin="normal" fullWidth>

                            <InputLabel htmlFor="description">Description</InputLabel>

                            <Input onChange={updateDescription} id="description" type="text" placeholder="Description" />

                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                            <Select native onChange={updateType}>
                                <option aria-label="None" value="" />
                                <option value={1}>Lodging</option>
                                <option value={2}>Travel</option>
                                <option value={3}>Food</option>
                                <option value={4}>Other</option>
                            </Select>
                        </FormControl>

                        <br /> <br />

                         {
                        props.authUser.role === 'manager' ?

                            <Link to = '/reimbursements' onClick= {createReimb} className = "btn btn-primary btn-m">Submit</Link>

                        :

                            <Link to = '/myreimbursements' onClick= {createReimb} className = "btn btn-primary btn-m">Submit</Link>

                    }

                        



                    </form>

                </div>


            </>

    );

}

export default NewReimbComponent;