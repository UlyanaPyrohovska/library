import { createContext, useContext, useState } from "react"

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    load: true,
    setLoad: () => { },
    setCurrentUser: () => { },
    setUserToken: () => { }
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [load, setLoad] = useState(true);

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token)
        } else {
            localStorage.removeItem('TOKEN')
        }
        _setUserToken(token)
    }

    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken,
                load,
                setLoad
            }}
        >
            {children}
        </StateContext.Provider>
    )
}
export const userStateContext = () => useContext(StateContext);