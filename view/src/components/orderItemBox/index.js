import React from 'react';
import { Link } from 'react-router-dom';

const OrderItemBox = (props) => {

    const { data } = props;
    console.log(data);

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
                    <h4>Cost: {data.cost}</h4>
                </div>
                <div>
                    <h4>Cost: {data.description}</h4>
                </div>
                <div>
                    <h4>Quantity: {data.quantity}</h4>
                </div>
                <div>
                    <h4>Total Price: {data.quantity * data.cost}</h4>
                </div>
            </Link>
        </div>
    );
};

export default OrderItemBox;