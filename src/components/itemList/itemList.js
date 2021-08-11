import React from 'react';
import './itemList.css';
import Spinner from '../spinner/';
import { useState, useEffect } from 'react';



function ItemList({getData, renderItem, onItemSelected}) {

    const [itemList, updateList] = useState(null);
    
    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data)
            })
            
    }, [])
    

    function renderItems(arr) {
        return arr.map((item) => {
            const label = renderItem(item);
            const {id} = item;
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}
                    >
                    {label}
                </li>   
            )
        })
    }

    if(!itemList) {
        return <Spinner/>
    }

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
    
} 

export default ItemList;