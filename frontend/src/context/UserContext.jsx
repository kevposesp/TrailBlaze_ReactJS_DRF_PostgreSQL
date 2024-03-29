import React, { useState, useEffect } from 'react'
import UserService from '../services/UserService';
import JwtService from '../services/JwtService';

const Context = React.createContext({})

export function UserContext({ children }) {
    const [token, setToken] = useState(JwtService.getToken ? JwtService.getToken : false);
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(function () {
        if (token) {
            UserService.GetUser()
                .then(({ data, status }) => {
                    if (status === 200) {
                        setUser(data.user);
                        setIsAuth(true);
                        setIsAdmin(data.user.role == 'Admin');
                    }
                })
                .catch(e => console.error(e))
        }
    }, [token]);

    return <Context.Provider value={{ user, setUser, token, setToken, isAuth, setIsAuth, isAdmin, setIsAdmin }}>
        {children}
    </Context.Provider>
}

export default Context