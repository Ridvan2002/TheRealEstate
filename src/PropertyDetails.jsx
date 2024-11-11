import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './styles/PropertyDetails.css';

function PropertyDetails({ listings, handleOpenAuthModal, onBuy }) {
    const { id } = useParams();
    const property = listings.find((listing) => listing.id === parseInt(id));
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [visibleImages, setVisibleImages] = useState(0); 
    const [lightboxImage, setLightboxImage] = useState(null); 

    if (!property) {
        return <p>Property not found.</p>;
    }

    const handleBuyNow = () => {
        if (!isLoggedIn) {
            handleOpenAuthModal(`/buy/${property.id}`);
        } else {
            onBuy(property);
        }
    };

    const showNextImage = () => {
        if (visibleImages < property.additionalImages.length - 3) {
            setVisibleImages(visibleImages + 1);
        }
    };

    const showPreviousImage = () => {
        if (visibleImages > 0) {
            setVisibleImages(visibleImages - 1);
        }
    };

    const openLightbox = (imgSrc) => {
        setLightboxImage(imgSrc);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    return (
<div className="property-details-page">
    <h1 className="property-title">{property.title}</h1>
    <div className="details-container">
        <img src={property.image} alt={property.title} className="main-image" />
        <div className="image-gallery-wrapper">
            <button className="nav-button nav-button-top" onClick={showPreviousImage} disabled={visibleImages === 0}>
                &uarr;
            </button>
            <div className="image-gallery">
                <div className="gallery-images">
                    {property.additionalImages.slice(visibleImages, visibleImages + 3).map((imgSrc, index) => (
                        <img 
                            key={index} 
                            src={imgSrc} 
                            alt={`${property.title} - ${index + 1}`} 
                            className="gallery-image"
                            onClick={() => openLightbox(imgSrc)}
                        />
                    ))}
                </div>
            </div>
            <button className="nav-button nav-button-bottom" onClick={showNextImage} disabled={visibleImages >= property.additionalImages.length - 3}>
                &darr;
            </button>
        </div>
    </div>
            <div className="property-info">
                <p><strong>Price:</strong> {property.price}</p>
                <p><strong>Address:</strong> {property.address}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                <p><strong>Square Footage:</strong> {property.squareFootage} sq ft</p>
                <p><strong>Description:</strong> {property.description}</p>
            </div>
            <button className="buy-button" onClick={handleBuyNow}>Buy Now</button>

            {lightboxImage && (
                <div className="lightbox" onClick={closeLightbox}>
                    <img src={lightboxImage} alt="Enlarged view" className="lightbox-image" />
                </div>
            )}
        </div>
    );
}

export default PropertyDetails;
