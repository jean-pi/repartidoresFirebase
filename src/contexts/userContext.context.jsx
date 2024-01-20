import { createContext, useContext, useState } from "react";

const userContext = createContext();


export const UserContextProvider = ({children}) =>{
    const [userContextValue, setUserContextValue] = useState("qq");
    return <userContext.Provider value={{userContextValue, setUserContextValue}}>{children}</userContext.Provider>
}



export const useUserContext = () =>{
    const context = useContext(userContext);
    if(context === undefined){
        throw new Error("useUserContext must be used within <UserConextProvider></UserConextProvider>")
    }
    return context;
}