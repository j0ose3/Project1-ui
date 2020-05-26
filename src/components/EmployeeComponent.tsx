import React, { useEffect, useState } from 'react';
import {Reimb} from '../models/reimb';
import {getAllMyReimbs, getReimbById} from '../remote/reimb-service';
import {User} from '../models/user';
import {Link} from 'react-router-dom';

interface IEmployeeProps{
    authUser: User;
    setThisReimb: (reimb: Reimb) => void;
}

const EmployeeComponent = (props: IEmployeeProps) =>{

    const [reimbsState, setReimbsState] = useState([] as Reimb[]);

    let reimbs: any[] = [];  

    useEffect(() => {


        let fetchData = async () => {

            const response = await getAllMyReimbs(props.authUser.id);

            for(let reimb of response){

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

                            {
                                reimb.status === 1 ?
                                <td>
                                    <Link to="/updatereimbursement"onClick={() => {props.setThisReimb(
                                    new Reimb(
                                            reimb.id,
                                            reimb.amount,
                                            reimb.submitted,
                                            reimb.resolved,
                                            reimb.description,
                                            reimb.author,
                                            reimb.resolver,
                                            reimb.status,
                                            reimb.type
                                            ));
                                        }} className="btn btn-primary btn-m">
                                        Update
                                    </Link>

                                </td>

                                :
                                <td>
                                    closed
                                </td>
                            }
    
                            
    
    
                        </tr>
    
                    )

            }

            setReimbsState(reimbs)

        }

        fetchData();

    }, []);

    return(
        !props.authUser || (props.authUser.role !== 'employee') ?

            <h1>You are not authorized to view this page</h1>
        
        :
        <>
            <h1> My Reimbursements</h1>
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
                        <th scope="col">Status</th>
                        <th scope="col">Type</th>                        
                    </tr>
                </thead>
                <tbody>
                    {reimbsState}
                </tbody>
            </table>
        </>
    )
}
export default EmployeeComponent;