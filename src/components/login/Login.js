import { useContext, useState } from 'react';
// import { Button, InputGroup } from '@blueprintjs/core';
// import { Button } from '@material-ui/core';
// import TextField from '@mui/material/TextField';
import { Snackbar, IconButton } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import { AuthContext } from '../../context/Auth';
import CancelIcon from '@material-ui/icons/Cancel';


function Login() {

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
        <div className="login">
            {isAuthenticated
                ? <button onClick={logout}>Logout</button>
                : <form onSubmit={handleSubmit}>
                    <input name="username" id="username" placeholder="username" />
                    <input name="password" id="password" placeholder="password" />
                    <button intent="success" type='submit' large="true">Login</button>
                </form>
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

export default Login;
