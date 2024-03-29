import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from "../../store/items/itemsActions";
import ItemDisplayBox from '../../components/itemDisplayBox';
import { Grid, Typography } from '@mui/material';

const ProductListings = () => {
    const items = useSelector((state) => state.items);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchItems = async () => {
            await dispatch(getItems());
        };
        fetchItems();
    }, [dispatch]);
    
    console.log(items.data);
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 3, px: 3}}>
            {items.isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                items.data.map((item) =>
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <ItemDisplayBox data={item} key={item.id} />
                </Grid>
                )
            )}
        </Grid>
    );
};

export default ProductListings;