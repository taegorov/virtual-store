import React, { useState, useContext, useEffect } from 'react';
import { Button, Snackbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { AuthContext } from '../../context/Auth';
import CloseIcon from '@mui/icons-material/Close';

export function AuthSnackbar() {

    const history = useHistory();

    // === === === snackbar behavior from MUI docs === === === //
    const [openLogout, setOpenLogout] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenLogout(false);
    };

    const closeButton = (
        <>
            <Button
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon />
            </Button>
        </>
    );

    useEffect(() => {
        console.log('is authenticated!', isAuthenticated)
        if (isAuthenticated === false) {
            console.log('logging out now...')
            setOpenLogout(true);
            history.push("/")
        } else if (isAuthenticated === true) {
            console.log('logging IN now...')
            setOpenLogout(true);
            history.push("/")
        }
        return () => {
            console.log('unmounting...')
        }
    }, [isAuthenticated, history])


    return (
        <Snackbar
            open={openLogout}
            autoHideDuration={4000}
            onClose={handleClose}
        >
            <MuiAlert
                action={closeButton}
                severity="success"
            >
                {isAuthenticated
                    ? 'Successfully Logged In!'
                    : 'Successfully Logged Out!'
                }
            </MuiAlert>
        </Snackbar>
    )
}
