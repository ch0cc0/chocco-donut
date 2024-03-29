import { Box, Card, CardActionArea, CardMedia, Container, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const OrderBox = (props) => {
    const theme = useTheme();

    const auth = useSelector((state) => state.auth)

    const { data } = props;
    console.log(data);

    return (
        <Card sx={{ my: 2, borderBottom: '0.3rem solid #e58300' }}>
            <CardActionArea component={Link} to={`/orders/${data.order_id}`} className='order-display-box'>
                <Container>
                    <Typography variant="h7">#{data.order_id}</Typography>
                    <Typography variant="h6">Order Total: &pound;{data.total_cost}</Typography>
                    <Typography variant="h7">Order Status: {data.status}</Typography>
                    <Typography variant="body2">Order Date: {data.order_created_at}</Typography>
                </Container>
                <Box sx={{ display: 'flex'}}>
                {data.item_thumbnails.map((thumbnailUrl, index) => (
                    <CardMedia key={index} component="img" sx={{mr: 1, width: 150, height: 100, flexShrink: 0, [theme.breakpoints.down('sm')]: {
                        width: 75, height: 50,
                    }, }} image={thumbnailUrl} alt={`Thumbnail ${index}`} />
                ))}
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default OrderBox;