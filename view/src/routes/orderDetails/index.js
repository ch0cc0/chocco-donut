import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import OrderItemBox from '../../components/orderItemBox';
import { getOrderDetails } from '../../store/order/orderActions'
import { Container, Typography } from '@mui/material';

const Orders = () => {
    const auth = useSelector((state) => state.auth);
    const order = useSelector((state) => state.order);

    const params = useParams();
    const orderId = parseInt(params.orderId);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userId = auth.userData.id;

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/auth/login');
        }

        const fetchOrderDetails = async () => {
            console.log(userId);
            console.log(orderId);
            const orderData = {
                userId,
                orderId
            }
            await dispatch(getOrderDetails(orderData));
        };

        fetchOrderDetails();
        
    }, [auth.isAuthenticated, navigate, dispatch]);

    
    
    return (
        <Container sx={{ mt: 2}}>
            <Typography variant='h4'>Order Details</Typography>
            <div>
                {order.isLoading && !order.data ? (
                    <h3>Loading...</h3>
                ) : order.data.length === 0 ? (
                    <div>No data available</div>
                ) : (
                    <>
                        {order.data.map((orderItem) =>
                            <Container>
                                <OrderItemBox data={orderItem} key={orderItem.id} />
                            </Container>
                        )}
                        <Typography variant='h5'>
                            Order Total Cost: {order.data[0].order_total_cost}
                        </Typography>
                    </>
                    )
                }
            </div>
        </Container>
    );
};

export default Orders;