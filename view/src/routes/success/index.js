import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCart } from '../../store/checkout/checkoutActions';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
    const auth = useSelector((state) => state.auth);
    const checkout = useSelector((state) => state.checkout);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Order Placed!</h2>
            <Link>View Order</Link>
        </div>
    );
};

export default SuccessPage;