import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Reimb } from '../models/reimb';
import { User } from '../models/user';
import { resolveReimb } from '../remote/reimb-service';
import { Link } from 'react-router-dom';
import { makeStyles, Typography, FormControl, InputLabel, Input } from '@material-ui/core';

export interface IReimbDetailsProps {

    authUser: User;
    thisReimb: Reimb;

}

const useStyles = makeStyles({
    detailsContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20,
    },
    detailsForm: {
        width: "50%",
    },
});

function ReimbDetailsComponent(props: IReimbDetailsProps) {
    const classes = useStyles();
    const [status, setStatus] = useState(props.thisReimb.status);
    const [type, setType] = useState(props.thisReimb.status);

    let approve = (e: SyntheticEvent) => {

        resolveReimb(props.thisReimb.id, props.authUser.id, 2);
    }

    let deny = (e: SyntheticEvent) => {

        resolveReimb(props.thisReimb.id, props.authUser.id, 3);
    }

    let getStatus = () => {
        if (props.thisReimb.status === 1) return 'Pending';
        else if (props.thisReimb.status === 2) return 'Approved';
        else if (props.thisReimb.status === 3) return 'Denied';
    }

    let getType = () => {
        if (props.thisReimb.type === 1) return 'Lodging';
        else if (props.thisReimb.type === 2) return 'Travel';
        else if (props.thisReimb.type === 3) return 'Food';
        else if (props.thisReimb.status === 4) return 'Other';
    }

    return (

        !props.authUser ?

            <h1>Please login to view this page</h1>

            :

            props.thisReimb.id === 0 ?

                <h1>Please select a reimbursement in the reimbursments page</h1>

                :

                <>

                    <div className={classes.detailsContainer}>

                        <form className={classes.detailsForm}>

                            <Typography align="center" variant="h6" > Reimbursement {props.thisReimb.id} Details </Typography>

                            <FormControl margin="normal" fullWidth>

                                <InputLabel htmlFor="id">Id</InputLabel>

                                <Input id="id" disabled={true} type="text" placeholder="Id" value={props.thisReimb.id} />

                            </FormControl>
                            
                            
                            <FormControl margin="normal" fullWidth>

                                <InputLabel htmlFor="amount">Amount</InputLabel>

                                <Input id="amount" disabled={true} type="text" placeholder="Amount" value={props.thisReimb.amount}/>

                            </FormControl>

                            <FormControl margin="normal" fullWidth>

                                <InputLabel htmlFor="submitted">submitted</InputLabel>

                                <Input id="submitted" disabled={true} type="text" placeholder="Submitted" value={props.thisReimb.submitted}/>

                            </FormControl>

                            <FormControl margin="normal" fullWidth>

                                <InputLabel htmlFor="resolved">Resolved</InputLabel>

                                <Input id="resolved" disabled={true} type="text" placeholder="Resolved" value={props.thisReimb.resolved}/>

                            </FormControl>

                            <FormControl margin="normal" fullWidth>

                                <InputLabel htmlFor="description">Description</InputLabel>

                                <Input id="description" disabled={true} type="text" placeholder="Description" value={props.thisReimb.description}/>

                            </FormControl>

                            <FormControl margin="normal" fullWidth>

                                <InputLabel htmlFor="author">Author</InputLabel>

                                <Input id="author" disabled={true} type="text" placeholder="Author" value={props.thisReimb.author}/>

                            </FormControl>

                            <FormControl margin="normal" fullWidth>

                                <InputLabel htmlFor="resolver">Resolver</InputLabel>

                                <Input id="resolver" disabled={true} type="text" placeholder="Resolver" value={props.thisReimb.resolver}/>

                            </FormControl>

                            <FormControl margin="normal" fullWidth>

                                <InputLabel htmlFor="status"> Status </InputLabel>

                                <Input id="status" disabled={true} type="text" placeholder="Status" value={
                                    props.thisReimb.status === 1 ?
                                        'Pending'
                                    :
                                    props.thisReimb.status === 2 ?
                                        'Approved'
                                    :
                                    props.thisReimb.status === 3 ?
                                        'Denied'
                                    :
                                        'Unknown'
                                }/>

                            </FormControl>

                            <FormControl margin="normal" fullWidth>

                                <InputLabel htmlFor="type">Type</InputLabel>

                                <Input id="type" disabled={true} type="text" placeholder="Type" value={
                                    
                                        props.thisReimb.type === 1 ?
                                            'Lodging'
                                        :
                                        props.thisReimb.type === 2 ?
                                            'Travel'
                                        :
                                        props.thisReimb.type === 3 ?
                                            'Food'
                                        :
                                            'Other'
                                    
                                }/>

                            </FormControl>
                        </form>

                    </div>





                    {
                        !props.thisReimb.resolved && props.authUser.role === 'manager' ?
                            <>

                                <Link to='/reimbursements' onClick={approve} className="btn btn-primary btn-m">Approve</Link>
                                <Link to='/reimbursements' onClick={deny} className="btn btn-primary btn-m">Deny</Link>

                            </>

                            :
                            <>

                            </>

                    }

                </>

    );

}

export default ReimbDetailsComponent;