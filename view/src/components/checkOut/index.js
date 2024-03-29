import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCart } from '../../store/checkout/checkoutActions';
import { Box, Button } from '@mui/material';

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
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button variant="contained" onClick={handleClick}>
                Checkout
            </Button>
        </Box>
    );
};

export default Checkout;