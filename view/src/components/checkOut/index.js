import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const navigate = useNavigate();

    const handleClick = () => {

    };
    

    return (
        <button onClick={handleClick}>
            Check Out
        </button>
    );
};

export default CheckOut;