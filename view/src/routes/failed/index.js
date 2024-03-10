import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FailedPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            navigate('/');
        }, 3000); // Redirect after 3 seconds

        return () => clearTimeout(redirectTimer); // Cleanup timer on unmount
    }, [navigate]);

    return (
        <div>
            <h2>Failed To Place Order!</h2>
            <h4>You will be redirected shortly. <Link to={'/'}>If not click here!</Link></h4>
        </div>
    );
};

export default FailedPage;