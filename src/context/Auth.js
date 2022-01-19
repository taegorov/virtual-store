import React from 'react';
// import cookie from 'react-cookies';
// import jwt from 'jsonwebtoken';

// import { useContext } from 'react';
// import ThemeContext from './Theme';

export const AuthContext = React.createContext();



export default class AuthProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            login: this.login,
            logout: this.logout,
            isAuthenticated: null,
            isAuthorized: this.isAuthorized,
            user: { capabilities: [] },
        }
    }


    // validating a username and password, setting a user if found and creating a token
    login = async (username, password) => {

        // search our testUser and return a valid user.
        let authString = `${username}:${password}`
        let response = await fetch((process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_PROD : process.env.REACT_APP_SERVER_DEV) + '/signin', {
            headers: {
                authorization: `basic ${btoa(authString)}`
            },
            method: 'POST'
        });
        let data = await response.json();
        console.log('🦅', data);

        if (!data.success) {
            return data
        }
        // let token = null;
        // cookie.save('token', data.token);
        // cookie.save('token', token);
        console.log('data user', data.data.user)
        this.setState({ isAuthenticated: true, user: data.data.user });
        return data
    }

    logout = () => {
        this.setState({
            user: { capabilities: [] },
            isAuthenticated: false,
        });
    }

    isAuthorized = (capability) => {
        if (this.state.user) {
            return this.state.user.capabilities?.includes(capability);
        }
    }

    render() {
        return (
            < AuthContext.Provider value={this.state} >
                {this.props.children}
            </AuthContext.Provider >
        )
    }
}
