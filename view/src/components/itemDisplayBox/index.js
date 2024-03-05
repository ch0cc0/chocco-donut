import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ItemDisplayBox = () => {

    const items = useSelector((state) => state.items);

    return (
        <Link to={`/donuts/${data.id}`} className='item-display-box'>
            <div>
                <h3>{items.name}</h3>
            </div>
            <div>
                <img src={data.url}/>
            </div>
            <div>
                <h4>{data.description}</h4>
            </div>
        </Link>
    );
};

export default ItemDisplayBox;