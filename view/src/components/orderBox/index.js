import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderBox = (props) => {

    const auth = useSelector((state) => state.auth)

    const { data } = props;
    console.log(data);

    return (
        <div>
            <Link to={`/orders/${auth.userData.id}/${data.order_id}`} className='order-display-box'>
                <div>
                    <div>
                        <div>
                            <div>
                                <h4>{data.order_created_at}</h4>
                            </div>
                            <div>
                                <h4>{data.total_cost}</h4>
                            </div>
                            <div>
                                <h4>{data.status}</h4>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h4>ORDER # {data.order_id}</h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        {data.item_thumbnails.map((thumbnailUrl, index) => (
                        <img key={index} src={thumbnailUrl} alt={`Thumbnail ${index}`} />
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default OrderBox;