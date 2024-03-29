import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cart/cartActions';
import { useNavigate } from 'react-router-dom';
import { Box, Button, ButtonGroup, Grid, Input, Typography } from '@mui/material';

const ItemQuantityInput = (props) => {
    const auth = useSelector((state) => state.auth);

    const {itemId} = props;
    const intItemId = parseInt(itemId, 10);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = async () => {
        if (!auth.isAuthenticated) {
            navigate('/auth/login');
            return;
        }

        const itemToAdd = {
            userId: auth.userData.id,
            itemId: intItemId,
            quantity,
        }

        console.log(itemToAdd);

        await dispatch(addToCart(itemToAdd));
    };

    return (
        <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center',}}>
                <ButtonGroup variant="contained" aria-label="Quantity selector" sx={{ mt: 3 }}>
                    <Button onClick={handleDecrement} color="secondary">
                        <Typography variant="h5">
                            -
                        </Typography>
                    </Button>
                    <Input type="number" value={quantity} readOnly inputProps={{ style: { textAlign: 'center' } }} />
                    <Button onClick={handleIncrement} color="secondary">
                        <Typography variant="h5">
                            +
                        </Typography>
                    </Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2}} >
                <Button variant="contained" onClick={handleAddToCart}>
                    <Typography variant="h5">
                        Add to Cart
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    );
};

export default ItemQuantityInput;