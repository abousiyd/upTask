import {useState, useEffect, createContext} from 'react'

const AuthContext = createContext()

const AuthProvidor = ({children}) => {

    const [auth, setAuth] = useState({}) // para returnar datos una vez estamos logeados

    return (
        < AuthContext.Provider
            value={{
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvidor
};

export default AuthContext;