import { Card, CardActionArea, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemById } from '../../store/item/itemActions';
import ItemQuantityInput from '../../components/itemQuantityInput';

const ItemDetails = () => {
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const itemDetails = useSelector((state) => state.item);

    useEffect(() => {
        const fetchItem = async () => {
            await dispatch(getItemById(itemId));
        };
        fetchItem();
    }, [dispatch, itemId]);

    return (
        <div>
            {itemDetails.isLoading || !itemDetails.data ? (
                <h3>Loading...</h3>
            ) : (
                <Container maxWidth="lg" sx={{ 
                    mt: 2, 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center', 
                }}>
                    <Card sx={{ maxWidth: 600}}>
                            <CardMedia
                                component="img"
                                height="auto"
                                image={itemDetails.data.item_image_url}
                                alt={itemDetails.data.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {itemDetails.data.name} - &pound;{itemDetails.data.cost}
                                </Typography>
                                <Typography variant="body2">
                                    {itemDetails.data.description}
                                </Typography>
                            </CardContent>
                    </Card>
                    <ItemQuantityInput itemId={itemId}/>
                </Container>
            )}
        </div>
    );
  };
  
  export default ItemDetails;