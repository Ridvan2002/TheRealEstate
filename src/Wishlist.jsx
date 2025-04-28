import React from 'react';
import PropertyCard from './PropertyCard';

function Wishlist({ wishlist, removeFromWishlist }) {
    const handleRemove = (property) => {
        removeFromWishlist(property);
    };

    return (
        <div className="wishlist-page">
            <h1>Your Wishlist</h1>
            {wishlist.length > 0 ? (
                <div className="property-grid">
                    {wishlist.map((property, index) => (
                        <PropertyCard
                            key={index}
                            property={property}
                            removeFromWishlist={() => handleRemove(property)}
                            isWishlist={true}
                        />
                    ))}
                </div>
            ) : (
                <p>Your wishlist is empty.</p>
            )}
        </div>
    );
}

export default Wishlist;
