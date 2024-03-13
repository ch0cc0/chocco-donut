import React, { useEffect } from 'react';
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
    };

    useEffect(() => {
        if (checkout.success && checkout.url) {
            window.location.href = checkout.url;
        }
    }, [checkout.success, checkout.url]);

    

    return (
        <button onClick={handleClick}>
            Checkout
        </button>
    );
};

export default Checkout;