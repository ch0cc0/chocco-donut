import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkPurchaseSuccess } from '../../store/stripe/stripeActions';
import { createOrder } from '../../store/orders/ordersActions';
import { Link, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const auth = useSelector((state) => state.auth);
    const checkout = useSelector((state) => state.checkout);
    const stripe = useSelector((state) => state.stripe);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.isAuthenticated) {
            const checkStripeStatus = async () => {
                await dispatch(checkPurchaseSuccess());
            };
    
            checkStripeStatus();
        }
    }, [auth.isAuthenticated, navigate, dispatch]);

    useEffect(() => {

        if (auth.userData.id) {
            const placeOrder = async () => {
            await dispatch(createOrder({userId: auth.userData.id}));
            };

            if (stripe.successStatus) {
                placeOrder();
            }       
        } 
        
    }, [dispatch, stripe.successStatus, auth.userData.id]);
    

    if (stripe.isLoading) return <h3>Loading...</h3>

    return (
        <div>
            {checkout.error ? (
                <h3>Failed to place order: {checkout.error}</h3>
            ) : (
                <div>
                    <h2>Order Placed!</h2>
                    <Link to={`/orders/${auth.userData.id}`}>View Orders</Link>
                </div>
            )}
        </div>
    );
};

export default SuccessPage;