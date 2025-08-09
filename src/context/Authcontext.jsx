import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const Authprovider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setusername] = useState(null);

    useEffect(() => {
        const LoginState = async () => {
            try{
            // const res = await fetch(`${import.meta.env.VITE_API_URL}/verify-user`, {
            const res = await fetch("http://localhost:5000/login/verify-user", {
                method: 'GET',
                credentials: 'include',
            })
            if (res.ok) {
                const data=await res.json();
                setIsLoggedIn(true);
                setusername(data.name);
            }
        }
            catch(error){
                console.error("Context Error: ",error)
            }
            
        }
        LoginState();
    },[])

    const login = (userdata) => {
        setusername(userdata.name)
        setIsLoggedIn(true);
    }

     const logout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });

            if (res.ok) {
                
                console.log("Logout successful");
            } else {
                console.log("Logout failed");
            }
        } catch (err) {
            console.error("Error during logout:", err);
        }finally{
            setIsLoggedIn(false);
            setusername(null);
        }
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
