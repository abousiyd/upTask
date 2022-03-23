import { useState, useEffect, createContext } from 'react'
import axios from '../../axios'


const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
    return (
        <ProyectosContext.Provider
            value={{
                
            }}
        >{children}
        </ProyectosContext.Provider> 
    )
}

export {
    ProyectosProvider
};

export default ProyectosContext;