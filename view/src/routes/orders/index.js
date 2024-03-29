import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrderBox from '../../components/orderBox';
import { getOrders } from '../../store/orders/ordersActions'
import { Container } from '@mui/material';

const Orders = () => {
    const auth = useSelector((state) => state.auth);
    const orders = useSelector((state) => state.orders);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userId = auth.userData.id;

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/auth/login');
        }

        const fetchOrders = async () => {
            console.log(userId);
            dispatch(getOrders(userId));
        };

        fetchOrders();
        
    }, [auth.isAuthenticated, navigate, dispatch]);

    return (
        <div>
            {orders.isLoading ? (
                <h3>Loading...</h3>
            ) : (
                <>
                <Container>
                    { orders.data.length > 0 ? (orders.data.map((orderItem) =>
                        <OrderBox data={orderItem} key={orderItem.id} />
                    )) : 
                    (
                        <div>
                            <h3>You have no Orders</h3>
                        </div>
                    )}
                </Container>
                </>
            )}
        </div>
    );
};

export default Orders;