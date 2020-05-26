import React, { useEffect, useState } from 'react';
import {Reimb} from '../models/reimb';
import {getAllReimbs, getReimbById} from '../remote/reimb-service';
import {User} from '../models/user';
import {Link} from 'react-router-dom';
import { FormControl, InputLabel, Select } from '@material-ui/core';

interface IReimbProps{
    authUser: User;
    setThisReimb: (reimb: Reimb) => void;
}

const ReimbComponent = (props: IReimbProps) =>{

    const [reimbsState, setReimbsState] = useState([] as Reimb[]);
    const [status, setStatus] = useState(0);
    const [type, setType] = useState(0);

    let reimbs: any[] = [];            

    let updateStatus = (e: any) => {
        setStatus(e.currentTarget.value);
    }; 

    let updateType = (e: any) => {
        setType(e.currentTarget.value);
    }

    useEffect(() => {


        let fetchData = async () => {

            const response = await getAllReimbs();

            for(let reimb of response){

                if((reimb.status == status || status == 0) && (reimb.type == type || type == 0)){

                    reimbs.push(

                        <tr>
                            <td>{reimb.id}</td>
                            <td>{reimb.amount}</td>
                            <td>{reimb.submitted}</td>
                            <td>{reimb.resolved}</td>
                            <td>{reimb.description}</td>
                            <td>{reimb.author}</td>
                            <td>{reimb.resolver}</td>
                            
                            {
                                reimb.status === 1 ?
                                    <td>Pending</td>
                                :
                                reimb.status === 2 ?
                                    <td>Approved</td>
                                :
                                reimb.status === 3 ?
                                    <td>Denied</td>
                                :
                                    <td>Unknown</td>
                            }
    
                            {
                                reimb.type === 1 ?
                                    <td>Lodging</td>
                                :
                                reimb.type === 2 ?
                                    <td>Travel</td>
                                :
                                reimb.type === 3 ?
                                    <td>Food</td>
                                :
                                    <td>Other</td>
                            }
    
                            <td><Link to = {`/reimbursementdetails-${reimb.id}`} onClick = {
                                async () => {
                                    const response = await getReimbById(reimb.id);
                                    props.setThisReimb(response);
                                }
                            } className = "btn btn-primary btn-m">Details</Link></td>
    
    
                        </tr>
    
                    )

                }

            }

            setReimbsState(reimbs)

        }

        fetchData();

    }, [status, type]);

    return(
        !props.authUser || (props.authUser.role !== 'manager') ?

            <h1>You are not authorized to view this page</h1>
        
        :
        <>
            <h1>Reimbursements</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Submitted</th>
                        <th scope="col">Resolved</th>
                        <th scope="col">Description</th>
                        <th scope="col">Author</th>
                        <th scope="col">Resolver</th>
                        <th scope = "col"> Status
                            <select value = {status} onChange = {updateStatus}>
                                <option value = {0}>All</option>
                                <option value = {1}>Pending</option>
                                <option value = {2}>Approved</option>
                                <option value = {3}>Denied</option>
                            </select>
                        </th>
                        <th scope="col"> Type
                            <select value={type} onChange={updateType}>
                                <option value={0}>all</option>
                                <option value={1}>Lodging</option>
                                <option value={2}>Travel</option>
                                <option value={3}>Food</option>
                                <option value={4}>Other</option>
                            </select>
                        </th>                        
                    </tr>
                </thead>
                <tbody>
                    {reimbsState}
                </tbody>
            </table>
        </>
    )
}
export default ReimbComponent;