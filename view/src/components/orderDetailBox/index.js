import React from 'react';
import { Link } from 'react-router-dom';

const OrderDetailBox = (props) => {

    const { data } = props;
    console.log(data);

    //finish! This should just display a single item from an order
    return (
        <div>
            <Link to={`/donuts/${data.id}`} className='item-display-box'>
                <div>
                    <h4>{data.name}</h4>
                </div>
                <div>
                    <img src={data.item_thumbnail_url} alt={data.description} />
                </div>
                <div>
                    <h4>{data.quantity}</h4>
                </div>
            </Link>
        </div>
    );
};

export default OrderDetailBox;