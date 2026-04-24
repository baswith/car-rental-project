import React, { createContext, use, useState } from 'react'

export const addResponseContext = createContext()
export const editResponseContext = createContext()
export const deleteResponseContext = createContext()
export const loginResponseContext = createContext()
export const bodyTypeContext = createContext()
export const authorizationContext=createContext()


function ContextAPI({ children }) {

    const [addResponse, setAddResponse] = useState({})
    const [editResponse, setEditResponse] = useState({})
    const [deleteResponse, setDeleteResponse] = useState({})
    const [loginResponse, setLoginResponse] = useState({})
    const [bodyType, setBodyType] = useState([])
    const [isAuthorized,setAuthorized]=useState(sessionStorage.getItem('token'))




    return (

       <authorizationContext.Provider value={{isAuthorized,setBodyType}}>
            <bodyTypeContext.Provider value={{bodyType,setBodyType}}>
                <loginResponseContext.Provider value={{ loginResponse, setLoginResponse }}>
                    <deleteResponseContext.Provider value={{ deleteResponse, setDeleteResponse }}>
                        <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
                            <editResponseContext.Provider value={{ editResponse, setEditResponse }}>
                                {children}
                            </editResponseContext.Provider>
                        </addResponseContext.Provider>
                    </deleteResponseContext.Provider>
                </loginResponseContext.Provider>
            </bodyTypeContext.Provider>
       </authorizationContext.Provider>
    )
}

export default ContextAPI