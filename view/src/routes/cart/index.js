import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from "../../store/cart/cartActions";
import CartItemBox from '../../components/cartItemBox';
import CheckOut from '../../components/checkOut';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userId = auth.userData.id;

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/auth/login');
        }

        const fetchCart = async () => {
            console.log(userId);
            dispatch(getCart(userId));
        };

        fetchCart();
        
    }, [auth.isAuthenticated, navigate, dispatch]);
    
    console.log(cart.data);
    return (
        <div>
            {cart.isLoading ? (
                <h3>Loading...</h3>
            ) : (
                cart.data.map((cartItem) =>
                    <CartItemBox data={cartItem} key={cartItem.id} />
                )
            )}
            <CheckOut />
        </div>
    );
};

export default Cart;