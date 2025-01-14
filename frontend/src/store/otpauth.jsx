import { createContext, useContext } from "react";

export const ForgotPasswordContext = createContext();

export const ForgotPasswordProvider = ({ children }) => {
    const storeTempTokenInLS = (tempToken) => {
        localStorage.setItem('tempToken', tempToken);
    };

    const getTempTokenFromLS = () => {
        return localStorage.getItem('tempToken');
    };

    const clearTempToken = () => {
        localStorage.removeItem('tempToken');
    };

    return (
        <ForgotPasswordContext.Provider value={{
            storeTempTokenInLS,
            getTempTokenFromLS,
            clearTempToken
        }}>
            {children}
        </ForgotPasswordContext.Provider>
    );
};

export const useForgotPassword = () => {
    const context = useContext(ForgotPasswordContext);
    if (!context) {
        throw new Error("useForgotPassword must be used within a ForgotPasswordProvider");
    }
    return context;
};
