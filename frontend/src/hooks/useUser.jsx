import { useCallback, useContext, useState } from "react"
import UserContext from "../context/UserContext";
import UserService from "../services/UserService";
import JwtService from "../services/JwtService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export function useUser() {
    const navigate = useNavigate();
    const { token, setToken, user, setUser, isAuth, setIsAuth, isAdmin, setIsAdmin } = useContext(UserContext)
    const [errorsUser, setErrorsUser] = useState('');

    const useLogin = useCallback((data) => {
        UserService.Login({ 'user': data })
            .then(({ data, status }) => {
                if (status === 200) {
                    setToken(data.token);
                    JwtService.saveToken(data.token);
                    setUser(data.user);
                    setIsAuth(true);
                    setIsAdmin(data.user.types === 'admin');
                    toast.success('Login successfully');
                    setErrorsUser('');
                    navigate('/');
                }

            })
            .catch((e) => {
                console.error(e);
                setErrorsUser(e.response.data[0]);
            });
    }, []);

    const useRegister = useCallback((data) => {
        UserService.Register({ 'user': data })
            .then(({ data, status }) => {
                if (status == 200) {
                    setToken(data.token);
                    JwtService.saveToken(data.token);
                    setUser(data.user);
                    setIsAuth(true);
                    setIsAdmin(data.user.types === 'admin');
                    toast.success('Register successfully');
                    setErrorsUser('');
                    navigate('/');
                }
            })
            .catch((e) => {
                console.error(e);
                setErrorsUser(e.response.data[0]);
            });
    }, []);

    const useLogout = useCallback(() => {
        UserService.Logout()
        sessionStorage.removeItem("time")
        JwtService.destroyToken();
        setToken(false);
        setIsAuth(false);
        setIsAdmin(false);
        setUser({});
        toast.success('Logout successfully');
        navigate('/');
    }, []);

    return { user, setUser, useRegister, useLogin, useLogout, refreshToken, errorsUser, setErrorsUser }
}