import { Box, Card, CardActionArea, CardMedia, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const OrderItemBox = (props) => {

    const { data } = props;
    console.log(data);

    return (
        <Card sx={{ my: 2, borderBottom: '0.3rem solid #e58300' }}>
            <CardActionArea component={Link} to={`/donuts/${data.id}`} className='item-display-box'>
                <Container>
                    <Typography variant="h6" sx={{ mt: 1}}>{data.name}</Typography>
                    <Container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                        <CardMedia component="img" sx={{mr: 1, width: 150, height: 100, flexShrink: 0}} image={data.item_thumbnail_url} alt={data.description} />
                        <Box  sx={{ order: { xs: 1, md: 0 } }}>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Cost: {data.cost}</Typography>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Quantity: {data.quantity}</Typography>
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>Total Price: {data.quantity * data.cost}</Typography>
                        </Box>
                    </Container>                    
                </Container>
            </CardActionArea>
        </Card>
    );
};

export default OrderItemBox;