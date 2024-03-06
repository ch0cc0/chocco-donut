import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemById } from "../../store/items/itemsActions";

const ItemDetails = () => {

    // TODO: factor out item reducer 

    const { itemId } = useParams();
    const dispatch = useDispatch();
    const itemsDetails = useSelector((state) => state.items);

    useEffect(() => {
        const fetchItem = async () => {
            await dispatch(getItemById(itemId));
        };
        fetchItem();
    }, [dispatch, itemId]);

    return (
        <div>
            {itemsDetails.isLoading || !itemsDetails.data ? (
                <h3>Loading...</h3>
            ) : (
                <div>
                    <div>
                        <h2>{itemsDetails.data[0].name}</h2>
                    </div>
                    <div>
                        <img src={itemsDetails.data[0].item_image_url} alt={itemsDetails.data[0].name} />
                    </div>
                    <div>
                        <h3>{itemsDetails.data[0].description}</h3>
                    </div>
                </div>
            )}
        </div>
    );
  };
  
  export default ItemDetails;