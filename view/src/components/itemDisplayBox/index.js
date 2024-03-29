import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemDisplayBox = (props) => {
    const navigate = useNavigate();

    const navigateToDonut = () => {
        navigate(`/donuts/${data.id}`);
    }

    const { data } = props;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={navigateToDonut}>
                <CardMedia
                    component="img"
                    height="180"
                    image={data.item_image_url}
                    alt={data.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Typography variant="body2">
                        {data.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    );
};

export default ItemDisplayBox;