// src/pages/ItemDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetailPage = () => {
    const { id } = useParams(); // Get the item ID from the URL
    const [itemDetails, setItemDetails] = useState(null);

    useEffect(() => {
        // Function to fetch item details
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/items/${id}`);
                if (!response.ok) throw new Error('Item not found');
                const data = await response.json();
                setItemDetails(data);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        fetchItemDetails();
    }, [id]);

    if (!itemDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{itemDetails.title}</h1>
            <p>{itemDetails.description}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default ItemDetailPage;
