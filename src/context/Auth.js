import React from 'react';
import cookie from 'react-cookies';
// import jwt from 'jsonwebtoken';
import axios from 'axios';

// import { useContext } from 'react';
// import ThemeContext from './Theme';

export const AuthContext = React.createContext();



// const testUsers = [
//   {
//     password: 'password',
//     name: 'Administrator',
//     role: 'admin',
//     capabilities: ['create', 'read', 'update', 'delete']
//   },
//   {
//     password: 'password',
//     name: 'Editor',
//     role: 'editor',
//     capabilities: ['read', 'update']
//   },
//   {
//     password: 'password',
//     name: 'Writer',
//     role: 'writer',
//     capabilities: ['create']
//   }
// ]


export default class AuthProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            login: this.login,
            logout: this.logout,
            isAuthenticated: false,
            isAuthorized: this.isAuthorized,
            user: { capabilities: [] },
        }
    }

    // validating a username and password, setting a user if found and creating a token
    login = async (username, password) => {

        let authString = `${username}:${password}`
        let response = await axios.get('https://backend-virtual-store.herokuapp.com/signin', {

            headers: {
                authorization: `basic ${btoa(authString)}`
            },
            // method: 'POST'
        });
        let data = await response.json();
        console.log('🦅 data', data);
        // let token = null;

        cookie.save('token', data.token);
        // cookie.save('token', token);
        this.setState({ isAuthenticated: true, user: data.user });
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
