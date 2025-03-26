"use client";

import { CheckCircle, Info, LinkBreak, Spinner, Warning, Notification } from "@phosphor-icons/react";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
    children: React.ReactNode;
}

// Define the type for the icon props
interface IconProps {
    type: string;
    isLoading?: boolean;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
    const CustomIcon = (props: IconProps) => {
        const { type, isLoading } = props;

        if (isLoading) return <Spinner />;

        switch (type) {
            case 'info':
                return <Info weight='duotone' size={28} />;
            case 'success':
                return <CheckCircle weight='duotone' size={28} />;
            case 'error':
                return <LinkBreak weight='duotone' size={28} />;
            case 'warning':
                return <Warning weight='duotone' size={28} />;
            case 'default':
                return <Notification size={28} />;
            default:
                return <Notification size={28} />;
        }
    };

    return (
        <div>
            {children}
            <ToastContainer
                icon={CustomIcon}
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default ToastProvider;