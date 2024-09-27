import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Import useAuth
import './styles/PropertyCard.css';

function PropertyCard({ property, addToWishlist, removeFromWishlist, isWishlist, handleOpenAuthModal }) { // Accept handleOpenAuthModal as a prop
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth(); // Use the useAuth hook

    const handleAddToWishlist = () => {
        if (!isLoggedIn) {
            handleOpenAuthModal('/wishlist'); // Trigger the modal to open if not logged in
        } else {
            addToWishlist(property);
            navigate('/wishlist');
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
                    <Link to={`/property/${property.id}`} className="btn-primary">Details</Link>
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
