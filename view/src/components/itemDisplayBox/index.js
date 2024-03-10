import React from 'react';
import { Link } from 'react-router-dom';

const ItemDisplayBox = (props) => {

    const { data } = props;

    return (
        <Link to={`/donuts/${data.id}`} className='item-display-box'>
            <div>
                <h3>{data.name}</h3>
            </div>
            <div>
                <img src={data.item_image_url} alt={data.description}/>
            </div>
            <div>
                <h4>{data.description}</h4>
            </div>
        </Link>
    );
};

export default ItemDisplayBox;