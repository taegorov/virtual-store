import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import MuiAlert from '@mui/material/Alert';

// === form === //
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useForm from '../../store/form';
import axios from 'axios';

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

    const profileStyle = useStyles();


    // scroll window to top at page load
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // === categories for 'categories' part of form === //
    const categories = [
        {
            value: 'Accessibility',
            label: 'Accessibility',
        },
        {
            value: 'Web Design',
            label: 'Web Design',
        },
        {
            value: 'Design',
            label: 'Design',
        },
        {
            value: 'Apps',
            label: 'Apps',
        },
        {
            value: 'Tutoring',
            label: 'Tutoring',
        },
        {
            value: 'Misc',
            label: 'Misc',
        }
    ];



    // // handle change for CATEGORY portion of form
    // const handleCategory = (event) => {
    //     setCategory(event.target.value);
    // };

    // const [category, setCategory] = React.useState('CATEGORY');


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
            {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
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
    const { handleChange, handleSubmit, values } = useForm(addItem);

    // // OLD ADD HERE
    // async function addItem(service) {
    //     // console.log('service is', service);
    //     // await axios.post('https://backend-virtual-store.herokuapp.com/services', service)
    //     await axios.post('/services', service)
    // }

    async function addItem(service) {
        // await axios.delete(`https://backend-virtual-store.herokuapp.com/services/${shownItem.id}`)
        // const servicesData = await axios.post('/services', service)
        const servicesData = await axios.post((process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_PROD : process.env.REACT_APP_SERVER_DEV) + `/services`, service)
        // console.log('response data', res.data)
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
                className={profileStyle.backButton}
                size="large"
                color="primary"
                variant="contained"
                startIcon={<ArrowBackIosTwoToneIcon />}
                component={Link} to={'/'}
            >
                Back to Store
            </Button>

            <p> upload new services here </p>
            <form onSubmit={handleSubmit} >
                <Box
                    className={profileStyle.form}
                    // component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField name="name" label="Service Name" variant="outlined" onChange={handleChange} />
                    <TextField name="freelancer" label="Freelancer id" variant="outlined" type="number" onChange={handleChange} />
                    <TextField
                        // disabled
                        name="category"
                        onChange={handleChange}
                        variant="outlined"
                        select
                        label="Select"
                        defaultValue="Misc"
                        value={values.category}
                        helperText="Pick a Category">
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* <TextField name="category" label="Category" variant="outlined" onChange={handleChange} /> */}
                    <TextField name="price" label="Price" variant="outlined" type="number" onChange={handleChange} />
                    <TextField
                        onChange={handleChange}
                        name="details"
                        label="Details"
                        variant="outlined"
                        multiline
                        maxRows={4}
                    />
                    <TextField name="image" label="Image URL" variant="outlined" onChange={handleChange} />
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
                    <MuiAlert action={action} onClose={handleClose} severity="success">Service Created!</MuiAlert>
                </Snackbar>
            </form>

        </div>
    )
}
