import React, { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "../toast.css";

interface PopUpContextProp {
    success: (text: string) => void,
    error: (text: string) => void,
    info: (text: string) => void
}

const popUpContextInitial: PopUpContextProp = {
    success: (text: string) => {
        toast.success(text);
    },
    error: (text: string) => {
        toast.error(text);
    },
    info: (text: string) => {
        toast.info(text);
    }
};

const PopUpContext = React.createContext<PopUpContextProp>(popUpContextInitial);

export const usePopUpContext = () => {
    const context = useContext(PopUpContext);
    return context;
}

export const PopUpProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <PopUpContext.Provider value={popUpContextInitial}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {children}
        </PopUpContext.Provider>
    );
};