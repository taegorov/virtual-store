import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { root } from '../../helper'


// === form === //
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useForm from '../../store/form';

require('dotenv').config();


export default function Profile() {

    const useStyles = makeStyles({
        backButton: {
            margin: '1em',
        },
        form: {
            backgroundColor: 'white',
        },
    });

    const signupStyle = useStyles();


    // scroll window to top at page load
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // === categories for 'categories' part of form === //
    const categories = [
        {
            value: 'user',
            label: 'user',
        },
        {
            value: 'freelancer',
            label: 'freelancer',
        },
    ];


    // === === === snackbar behavior from MUI docs === === === //
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        history.push("/")
    };

    const action = (
        <React.Fragment>
            <Button
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                X
            </Button>
        </React.Fragment>
    );


    // ADD NEW SERVICE TO BACK END
    const { handleChange, handleSubmit, values } = useForm(addUser);

    // // OLD ADD HERE
    // async function addItem(service) {
    //     // console.log('service is', service);
    //     // await axios.post('https://backend-virtual-store.herokuapp.com/services', service)
    //     await axios.post('/services', service)
    // }

    async function addUser(user) {
        // await axios.delete(`https://backend-virtual-store.herokuapp.com/services/${shownItem.id}`)
        // const servicesData = await axios.post('/services', service)
        // const servicesData = await axios.post((process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_PROD : process.env.REACT_APP_SERVER_DEV) + `/services`, service)
        const servicesData = await axios.post(root + `/signup`, user)
        console.log('services data', servicesData)
        if (!!servicesData.data.success) {
            // if (res.data.deleted === 1) {
            console.log('front end RES', servicesData.data);
            setOpen(true);
        } else {
            alert(`ALERT: ${servicesData.data.message}`);
        }
    }

    return (
        <div>
            <Button
                className={signupStyle.backButton}
                size="large"
                color="primary"
                variant="contained"
                startIcon={<ArrowBackIosTwoToneIcon />}
                component={Link} to={'/'}
            >
                Back to Store
            </Button>

            <p> Create a New Account </p>
            <form onSubmit={handleSubmit} >
                <Box
                    className={signupStyle.form}
                    // component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField name="username" label="Username" variant="outlined" onChange={handleChange} />
                    <TextField name="password" label="Password" variant="outlined" type="password" onChange={handleChange} />
                    <TextField
                        // disabled
                        name="role"
                        onChange={handleChange}
                        variant="outlined"
                        select
                        label="Select"
                        defaultValue="user"
                        value={values.category}
                        helperText="Pick a Role">
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button variant='outlined' type='submit' > Submit </Button>
                </Box>

                <Snackbar
                    severity="error"
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    message="Service Deleted!"
                    action={action}
                >
                    <MuiAlert action={action} onClose={handleClose} severity="success">User Created!</MuiAlert>
                </Snackbar>
            </form>

        </div>
    )
}
