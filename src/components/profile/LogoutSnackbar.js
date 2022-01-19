import React, { useState, useContext, useEffect } from 'react';
import { Button, Snackbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { AuthContext } from '../../context/Auth'


export function LogoutSnackbar() {

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

    const logoutAction = (
        <>
            <Button
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                X
            </Button>
        </>
    );

    useEffect(() => {
        console.log('is authenticated!', isAuthenticated)
        if (isAuthenticated === false) {
            console.log('logging out now...')
            setOpenLogout(true);
            history.push("/")
        }
        return () => {
            console.log('unmounting...')
        }
        // eslint-disable-next-line
    }, [isAuthenticated])


    return (
        <Snackbar
            severity="success"
            open={openLogout}
            autoHideDuration={4000}
            onClose={handleClose}
            message="Successfully Logged Out"
            action={logoutAction}
        >
            <MuiAlert action={logoutAction} onClose={handleClose} severity="success">Successfully Logged Out!</MuiAlert>
        </Snackbar>
    )
}
