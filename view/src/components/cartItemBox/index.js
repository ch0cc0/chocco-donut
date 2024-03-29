import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartItemBox = (props) => {

    const { data } = props;
    console.log(data);

    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Grid item container spacing={2} xs={12} md={6} lg={4}>
            <Grid item>
                <Card sx={{ my: 2, mx: 2 }}>
                    <CardActionArea onClick={() => navigate(`/donuts/${data.id}`)} sx={{ display: 'flex' }}>
                        <Grid container alignItems="center" wrap="nowrap">
                            <Grid item>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 150, height: 150, flexShrink: 0, [theme.breakpoints.down('sm')]: {
                                        width: 100, height: 100
                                    }, }}
                                    image={data.item_thumbnail_url}
                                    alt={data.description}
                                />
                            </Grid>
                            <Grid item>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h6">
                                            {data.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            Quantity: {data.quantity}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
      );
};

export default CartItemBox;