import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './PropertyCard.css';

function PropertyCard({ property, addToWishlist, removeFromWishlist, isWishlist }) {
    const navigate = useNavigate();

    const handleAddToWishlist = () => {
        if (!isWishlist) { // Check to avoid adding duplicates
            addToWishlist(property);
            navigate('/wishlist'); // Redirect to wishlist
        }
    };

    return (
        <div className="property-card">
            <img src={property.image} alt={property.title} className="property-image" />
            <div className="property-details">
                <h2>{property.title}</h2>
                <p>{property.address}</p>
                <p><strong>Price:</strong> {property.price}</p>
                <div className="property-actions">
                    <Link to={`/property/${property.id}`} className="btn-primary">See details</Link> {/* Link to PropertyDetails page */}
                    {isWishlist ? (
                        <button className="btn-secondary btn-remove-from-wishlist" onClick={() => removeFromWishlist(property)}>
                            Remove
                        </button>
                    ) : (
                        <button className="btn-secondary btn-add-to-wishlist" onClick={handleAddToWishlist}>
                            Add to Wishlist
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;
