import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from "../../store/items/itemsActions";
import ItemDisplayBox from '../../components/itemDisplayBox';

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
        <div>
            {items.isLoading ? (
                <h3>Loading...</h3>
            ) : (
                items.data.map((item) =>
                    <ItemDisplayBox data={item} key={item.id} />
                )
            )}
        </div>
    );
};

export default ProductListings;