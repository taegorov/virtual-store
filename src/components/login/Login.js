import { useContext, useState } from 'react';
// import { Button, InputGroup } from '@blueprintjs/core';
// import { Button } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { Snackbar, IconButton, Button, Typography } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import { AuthContext } from '../../context/Auth';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';



export default function Login() {

    const useStyles = makeStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        },
        formContainer: {
            margin: '.5em',
            // width: '70%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        formField: {
            backgroundColor: 'white',
        },
        formButton: {
            backgroundColor: '#fcba03',
            margin: '.5em',
        }
    });

    const loginStyle = useStyles();


    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const { isAuthenticated, login, logout } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;

        const data = await login(username, password);
        if (!data.success) {
            return setErrorMessage(data.message)
        }
        setSuccessMessage(data.message);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage(null);
        // history.push("/")
    };


    const action = (
        <>
            {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CancelIcon />
            </IconButton>
        </>
    );

    return (
        <div className={loginStyle.container}>
            {isAuthenticated
                ? <Button className={loginStyle.formButton} onClick={logout}>Logout</Button>
                : <>
                    <Typography>Is this your service? Sign in to edit or delete</Typography>
                    <form className={loginStyle.formContainer} onSubmit={handleSubmit}>
                        <TextField className={loginStyle.formField} variant="filled" name="username" id="username" placeholder="username" />
                        <TextField className={loginStyle.formField} variant="filled" name="password" id="password" placeholder="password" />
                        <Button className={loginStyle.formButton} intent="success" type='submit' large="true">Login</Button>
                    </form>
                </>
            }
            {errorMessage}

            <Snackbar
                // severity="success"
                open={!!successMessage}
                autoHideDuration={4000}
                onClose={handleClose}
                // message="Service Deleted!"
                action={action}
            >
                <MuiAlert action={action} onClose={handleClose} severity="success">{successMessage}</MuiAlert>
            </Snackbar>
        </div>
    )
}

// export default Login;
