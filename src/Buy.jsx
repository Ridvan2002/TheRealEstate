import React, { useState } from 'react';
import PropertyCard from './Cards/PropertyCard';

function Buy({ listings, addToWishlist }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        priceRange: '',
        bedrooms: '',
        propertyType: '',
        sortBy: '',
    });

    // Filter and sort listings based on search query and filters
    const filteredListings = listings
        .filter(property => {
            const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  property.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = !filters.priceRange || (property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]);
            const matchesBedrooms = !filters.bedrooms || property.bedrooms === parseInt(filters.bedrooms);
            const matchesPropertyType = !filters.propertyType || property.propertyType === filters.propertyType;

            return matchesSearch && matchesPrice && matchesBedrooms && matchesPropertyType;
        })
        .sort((a, b) => {
            if (filters.sortBy === 'priceLowToHigh') {
                return a.price - b.price;
            } else if (filters.sortBy === 'priceHighToLow') {
                return b.price - a.price;
            } else if (filters.sortBy === 'newest') {
                return b.id - a.id; // Assuming `id` correlates with how new the property is
            }
            return 0;
        });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <div className="buy-page">
            <h1>Find Your Dream Home</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    padding: '10px',
                    marginBottom: '20px',
                    fontSize: '16px',
                    width: '100%',
                    maxWidth: '500px'
                }}
            />

            {/* Filter Options */}
            <div className="filters">
                <label>
                    Price Range:
                    <select name="priceRange" onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value={[0, 100000]}>Up to $100,000</option>
                        <option value={[100000, 300000]}>$100,000 - $300,000</option>
                        <option value={[300000, 500000]}>$300,000 - $500,000</option>
                        <option value={[500000, 1000000]}>$500,000 - $1,000,000</option>
                        <option value={[1000000, Infinity]}>Over $1,000,000</option>
                    </select>
                </label>

                <label>
                    Bedrooms:
                    <select name="bedrooms" onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="1">1 Bedroom</option>
                        <option value="2">2 Bedrooms</option>
                        <option value="3">3 Bedrooms</option>
                        <option value="4">4 Bedrooms</option>
                        <option value="5">5+ Bedrooms</option>
                    </select>
                </label>

                <label>
                    Property Type:
                    <select name="propertyType" onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="House">House</option>
                        <option value="Condo">Condo</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Land">Land</option>
                    </select>
                </label>

                <label>
                    Sort By:
                    <select name="sortBy" onChange={handleFilterChange}>
                        <option value="">None</option>
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                        <option value="newest">Newest Listings</option>
                    </select>
                </label>
            </div>

            {/* Property Listings */}
            {filteredListings.length > 0 ? (
                <div className="property-grid">
                    {filteredListings.map((property, index) => (
                        <PropertyCard
                            key={index}
                            property={property}
                            addToWishlist={addToWishlist}
                            isWishlist={false}
                        />
                    ))}
                </div>
            ) : (
                <p>No properties match your criteria.</p>
            )}
        </div>
    );
}

export default Buy;
