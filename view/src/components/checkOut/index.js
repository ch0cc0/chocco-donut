import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCart } from '../../store/checkout/checkoutActions';

const Checkout = () => {
    const auth = useSelector((state) => state.auth);
    const checkout = useSelector((state) => state.checkout);
    const dispatch = useDispatch();

    const handleClick = async () => {
        const userId = auth.userData.id;
        console.log(userId);
        await dispatch(checkoutCart({userId}));
        if (checkout.success) {
            window.location.href = checkout.url.url;
        }
    };
    

    return (
        <button onClick={handleClick}>
            Checkout
        </button>
    );
};

export default Checkout;