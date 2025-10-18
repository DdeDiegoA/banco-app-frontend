import React from "react";
import { useGlobalStore } from "../../stores/useGlobalStore";
import "./GlobalSpinner.css";

const GlobalSpinner: React.FC = () => {
    const { isLoading, loadingMessage } = useGlobalStore();

    if (!isLoading) return null;

    return (
        <div className="global-spinner__overlay" role="alert" aria-busy="true">
            <div className="global-spinner__container">
                <div className="global-spinner__circle" />
                {loadingMessage && (
                    <span className="global-spinner__text">
                        {loadingMessage}
                    </span>
                )}
            </div>
        </div>
    );
};

export default GlobalSpinner;
