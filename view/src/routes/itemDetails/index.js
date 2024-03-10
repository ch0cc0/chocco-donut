import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemById } from '../../store/item/itemActions';
import ItemQuantityInput from '../../components/itemQuantityInput';

const ItemDetails = () => {

    // TODO: factor out item reducer 

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
                <div>
                    <div>
                        <div>
                            <h2>{itemDetails.data.name}</h2>
                        </div>
                        <div>
                            <img src={itemDetails.data.item_image_url} alt={itemDetails.data.name} />
                        </div>
                        <div>
                            <h3>{itemDetails.data.description}</h3>
                        </div>
                    </div>
                    <div>
                        <ItemQuantityInput itemId={itemId}/>
                    </div>
                </div>
            )}
        </div>
    );
  };
  
  export default ItemDetails;