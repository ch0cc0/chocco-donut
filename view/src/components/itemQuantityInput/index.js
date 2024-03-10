import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cart/cartActions';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={quantity} readOnly />
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ItemQuantityInput;