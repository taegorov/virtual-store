import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import { Button, Snackbar } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';


// === form === //
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useForm from '../../store/form';
import axios from 'axios';
// import { sortedLastIndex } from 'lodash';

require('dotenv').config();


// Help with Modal code from MUI docs //
export default function PutModal(props) {

    const useStyles = makeStyles({
        rootButton: {
            border: 'solid',
            borderColor: 'green',
        },
        container: {
            fontFamily: 'Inter',
            backgroundColor: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            // width: 700,
            width: '80%',
            height: '36em',
            maxHeight: '90%',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            color: 'black',
            borderRadius: '10px',
            padding: '1em',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
        },
        header: {
            textAlign: 'center',
            fontFamily: "Inter",
            fontSize: '2em',
        },
        form: {
            justifyContent: 'center',
            margin: '0 auto',

            width: '95%',
            maxWidth: '95%',
        },
        button: {
            fontFamily: 'Inter',
            padding: '1em',
            backgroundColor: '#f0f0f0',
            // position: 'absolute',
            // bottom: '1em',
            // right: '1em',
            // margin: '0 auto',
            alignItems: 'flex-end',
        }
    });

    const modalStyle = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { service } = props
    // console.log('modal props', props)


    // ADD NEW SERVICE TO BACK END
    const { handleChange, handleSubmit, values } = useForm(updateItem);

    const root = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_PROD : process.env.REACT_APP_SERVER_DEV)
    // console.log('root is: ', root)

    async function updateItem(update) {
        // console.log('service is: ', service)
        // const servicesData = await axios.put(`/services/${service.id}`, update)
        const servicesData = await axios.put(root + `/services/${service.id}`, update)


        if (!!servicesData.data.success) {
            console.log('res for PUT on front end:', servicesData.data);
            snackSetOpen(true);
        } else {
            alert(`ALERT: ${servicesData.data.message}`);
        }
    }

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


    // === === === snackbar behavior from MUI docs === === === //
    const history = useHistory();
    const [snackOpen, snackSetOpen] = useState(false);


    const snackHandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        snackSetOpen(false);
        history.push("/")
    };

    const action = (
        <React.Fragment>
            <Button
                size="small"
                aria-label="close"
                color="inherit"
                onClick={snackHandleClose}
            >
                X
            </Button>
        </React.Fragment>
    );

    return (
        <div >
            <Button className={modalStyle.rootButton} onClick={handleOpen}>Edit This Service</Button>
            <Modal
                sx={{ outline: 'none' }}
                open={open}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit} >
                    <Box className={modalStyle.container} >
                        <p className={modalStyle.header}>
                            Edit Service
                        </p>

                        <TextField
                            margin="normal"
                            className={modalStyle.form}
                            name="name"
                            label="Service Name"
                            variant="standard"
                            defaultValue={service.name}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="normal"
                            className={modalStyle.form}
                            name="category"
                            label="Category"
                            variant="standard"
                            defaultValue={service.category}
                            onChange={handleChange}
                            select
                            value={values.category}
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            margin="normal"
                            className={modalStyle.form}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            type="number"
                            name="price"
                            label="Price"
                            variant="standard"
                            defaultValue={service.price}
                            onChange={handleChange}
                        />

                        <TextField
                            margin="normal"
                            className={modalStyle.form}
                            name="details"
                            label="Details"
                            variant="standard"
                            multiline
                            maxRows={4}
                            defaultValue={service.details}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            className={modalStyle.form}
                            name="image"
                            label="Image URL"
                            variant="standard"
                            defaultValue={service.image}
                            onChange={handleChange}
                        />
                        <Button className={modalStyle.button} onChange={handleChange} type='submit'>Submit</Button>
                    </Box>
                </form>
            </Modal >
            <Snackbar
                severity="error"
                open={snackOpen}
                autoHideDuration={4000}
                onClose={snackHandleClose}
                message="Service Updated!"
                action={action}
            >
                <MuiAlert action={action} onClose={snackHandleClose} severity="success">Service Updated!</MuiAlert>
            </Snackbar>
        </div >
    );
}
