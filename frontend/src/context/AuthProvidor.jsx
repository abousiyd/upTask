import {useState, useEffect, createContext} from 'react'

const AuthContext = createContext()

const AuthProvidor = ({children}) => {

    return (
        < AuthContext.Provider
            value={{

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