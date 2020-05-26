import React from 'react';
import {makeStyles, List, Typography, ListItem, ListItemText} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { User } from '../models/user';
import { p1 } from '../remote/project1-client';

export interface INavBarProps{

    authUser: User
    setAuthUser: (user: User) => void

}

const useStyles = makeStyles({

    link:{
        textDecoration: "none",
        color: "white"
    }

});


const NavbarComponent = (props: INavBarProps) => {

    const classes = useStyles();

    async function logout(){

        await p1.get('/auth');
        //@ts-ignore
        props.setAuthUser(null as User);
    
    }

    return(
        <>
            <List component = "nav">

                <ListItem component = "div">

                    <Typography color = "inherit" variant = "h5">ERS</Typography>

                    {
                        !props.authUser ?

                            <ListItemText inset>
                                <Typography color = "inherit" variant = "h6">
                                    <Link to = "/login" className = {classes.link}>Login</Link>
                                </Typography>
                            </ListItemText> 

                        :
                        
                        props.authUser.role === 'admin' ?
                            <>
                                <ListItemText inset>
                                    <Typography color = "inherit" variant = "h6">
                                        <Link to = "/home" className = {classes.link}>Home</Link>
                                    </Typography>
                                </ListItemText>

                                <ListItemText inset>
                                    <Typography color = "inherit" variant = "h6">
                                    <Link to = "/register" className = {classes.link}>Register</Link>
                                    </Typography>
                                </ListItemText>

                                <ListItemText inset>
                                    <Typography color = "inherit" variant = "h6">
                                        <Link to = "/users" className = {classes.link}>Users</Link>
                                    </Typography>
                                </ListItemText>

                                <ListItemText inset>
                                    <Typography color = "inherit" variant = "h6">
                                        <Link to = '' onClick = {logout} className = {classes.link}>Logout</Link>
                                    </Typography>
                                </ListItemText> 
                            </>
                        
                        :

                        props.authUser.role === 'manager' ?

                            <>
                                <ListItemText inset>
                                    <Typography color = "inherit" variant = "h6">
                                        <Link to = "/home" className = {classes.link}>Home</Link>
                                    </Typography>
                                </ListItemText>

                                <ListItemText inset>
                                    <Typography color = "inherit" variant = "h6">
                                        <Link to = "/reimbursements" className = {classes.link}>Reimbursements</Link>
                                    </Typography>
                                </ListItemText>

                                <ListItemText inset>
                                    <Typography color = "inherit" variant = "h6">
                                        <Link to = "/newreimbursement" className = {classes.link}>New Reimbursement</Link>
                                    </Typography>
                                </ListItemText>

                                <ListItemText inset>
                                    <Typography color = "inherit" variant = "h6">
                                        <Link to = '' onClick = {logout} className = {classes.link}>Logout</Link>
                                    </Typography>
                                </ListItemText> 
                            </>

                        :

                        <>
                            <ListItemText inset>
                                <Typography color = "inherit" variant = "h6">
                                    <Link to = "/home" className = {classes.link}>Home</Link>
                                </Typography>
                            </ListItemText>

                            <ListItemText inset>
                                <Typography color = "inherit" variant = "h6">
                                    <Link to = "/newreimbursement" className = {classes.link}>New Reimbursement</Link>
                                </Typography>
                            </ListItemText>

                            <ListItemText inset>
                                <Typography color = "inherit" variant = "h6">
                                    <Link to = "/myreimbursements" className = {classes.link}>My Reimbursements</Link>
                                </Typography>
                            </ListItemText>

                            <ListItemText inset>
                                <Typography color = "inherit" variant = "h6">
                                    <Link to = '' onClick = {logout} className = {classes.link}>Logout</Link>
                                </Typography>
                            </ListItemText> 
                        </>

                    }


                </ListItem>

            </List>
        </>
    )

}

export default NavbarComponent;
