import { useContext } from 'react';
// import { Button, InputGroup } from '@blueprintjs/core';
// import { Button } from '@material-ui/core';
// import TextField from '@mui/material/TextField';


import { AuthContext } from '../../context/Auth';

function Login() {

    const { isAuthenticated, login, logout } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;

        login(username, password);
    }

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
        </div>
    )
}

export default Login;
