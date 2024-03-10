import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrderItemBox from '../../components/orderItemBox';

const Orders = () => {
    const auth = useSelector((state) => state.auth);
    const order = useSelector((state) => state.order);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userId = auth.userData.id;

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/auth/login');
        }

        const fetchCart = async () => {
            console.log(userId);
            dispatch();
        };

        fetchCart();
        
    }, [auth.isAuthenticated, navigate, dispatch]);
    
    console.log();
    return (
        <div>
            {orders.isLoading ? (
                <h3>Loading...</h3>
            ) : (
                orders.data.map((orderItem) =>
                    <OrderItemBox data={orderItem} key={orderItem.id} />
                )
            )}
        </div>
    );
};

export default Orders;