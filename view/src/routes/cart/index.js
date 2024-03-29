import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from "../../store/cart/cartActions";
import CartItemBox from '../../components/cartItemBox';
import Checkout from '../../components/checkout/index.js';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';

const Cart = () => {
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userId = auth.userData.id;

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/auth/login');
        } else {
            const fetchCart = async () => {
                console.log(userId);
                dispatch(getCart(userId));
            };
    
            fetchCart();    
        }
    }, [auth.isAuthenticated, navigate, dispatch]);
    
    console.log(cart.data);
    return (
        <Container sx={{mt: 2}}>
            {cart.isLoading ? (
                <Typography component="div" variant="h3">
                    Loading...
                </Typography>
            ) : (
                <>
                <Grid container spacing={2} >
                    {cart.data.length > 0 ? (
                        cart.data.map((cartItem) =>
                            <CartItemBox data={cartItem} key={cartItem.id} />
                        )
                    ) : (
                        <Typography component="div" variant="h3" >Cart Empty</Typography>
                    )}
                </Grid>
                {cart.data.length > 0 && <Checkout />}
                </>
            )}
        </Container>
    );
};

export default Cart;