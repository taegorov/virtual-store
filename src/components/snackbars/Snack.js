// import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux'
import { Button, Snackbar } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { openSnackbar, closeSnackbar } from '../../store/misc'


function Snack({ snack, openSnackbar, closeSnackbar }) {
    const { open, severity, message } = snack
    // const history = useHistory();

    // === snackbar behavior from MUI docs === //
    // const [openLogout, setOpenLogout] = useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        closeSnackbar();
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


    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
        >
            <MuiAlert
                action={closeButton}
                severity={severity}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    )
}

const mapStateToProps = (state) => {
    console.log('state is: ', state)
    return {
        snack: state.misc.snack
    }
}

const mapDispatchToProps = {
    openSnackbar,
    closeSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(Snack);
