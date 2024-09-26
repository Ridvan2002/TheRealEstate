import React, { useState } from 'react';
import './ListProperty.css';
import { useNavigate } from 'react-router-dom';

function ListProperty({ addListing }) {
    const [formData, setFormData] = useState({
        address: '',
        propertyType: '',
        bedrooms: '',
        bathrooms: '',
        squareFootage: '',
        price: '',
        description: '',
        mainImage: null,
        additionalImages: []
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            if (name === 'mainImage') {
                setFormData({ ...formData, [name]: files[0] }); // Store the first file selected
            } else if (name === 'additionalImages') {
                setFormData({ ...formData, [name]: Array.from(files) }); // Store the list of files for additional images
            }
        } else if (name === 'price') {
            const formattedPrice = formatPrice(value.replace(/[^0-9]/g, '')); // Remove non-digits
            setFormData({ ...formData, [name]: formattedPrice });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const formatPrice = (value) => {
        if (!value) return '';
        const numberValue = parseInt(value, 10);
        return `$${numberValue.toLocaleString()}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const title = `${formData.bedrooms} Bedroom ${formData.propertyType}`;

        const newListing = {
            id: Date.now(),
            title: title,
            description: formData.description,
            price: formData.price,
            image: URL.createObjectURL(formData.mainImage),
            address: formData.address,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            squareFootage: formData.squareFootage,
            additionalImages: formData.additionalImages.map(file => URL.createObjectURL(file)) 
        };

        addListing(newListing);

        window.alert('Successfully submitted!');
        navigate('/');
    };

    return (
        <div className="list-property-form">
            <h1>List Your Property</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="3624 Brookeview Street, Atlanta, GA 30336"
                    />
                </div>
                <div className="form-row">
                    <div>
                        <label>Property Type:</label>
                        <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                        >
                            <option value="">Select a property type</option>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Condo">Condo</option>
                            <option value="Land">Land</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div>
                        <label>Bedrooms:</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Bathrooms:</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Square Footage:</label>
                        <input
                            type="text"
                            name="squareFootage"
                            value={formData.squareFootage}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label>Price:</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="$0"
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label>Upload Main Image:</label>
                    <input
                        type="file"
                        name="mainImage"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Upload Additional Images:</label>
                    <input
                        type="file"
                        name="additionalImages"
                        multiple
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ListProperty;
