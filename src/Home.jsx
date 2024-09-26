import React, { useState } from 'react';
import PropertyCard from './Cards/PropertyCard';

function Home({ listings, addToWishlist }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        priceRange: '',
        bedrooms: '',
        propertyType: '',
        sortBy: '',
    });

    const convertPriceToNumber = (price) => {
        return parseInt(price.replace(/[^0-9]/g, ''), 10);
    };

    const filteredListings = listings
        .filter(property => {
            const priceAsNumber = convertPriceToNumber(property.price);

            const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  property.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = !filters.priceRange || 
                (priceAsNumber >= parseInt(filters.priceRange.split(',')[0]) && priceAsNumber <= parseInt(filters.priceRange.split(',')[1]));
            const matchesBedrooms = !filters.bedrooms || property.title.toLowerCase().includes(`${filters.bedrooms} bedroom`.toLowerCase());
            const matchesPropertyType = !filters.propertyType || property.title.toLowerCase().includes(filters.propertyType.toLowerCase());

            return matchesSearch && matchesPrice && matchesBedrooms && matchesPropertyType;
        })
        .sort((a, b) => {
            if (filters.sortBy === 'priceLowToHigh') {
                return convertPriceToNumber(a.price) - convertPriceToNumber(b.price);
            } else if (filters.sortBy === 'priceHighToLow') {
                return convertPriceToNumber(b.price) - convertPriceToNumber(a.price);
            } else if (filters.sortBy === 'newest') {
                return b.id - a.id;
            }
            return 0;
        });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <div className="home-page">
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

            <div className="filters">
                <label>
                    Price Range:
                    <select name="priceRange" onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="0,100000">Up to $100,000</option>
                        <option value="100000,300000">$100,000 - $300,000</option>
                        <option value="300000,500000">$300,000 - $500,000</option>
                        <option value="500000,1000000">$500,000 - $1,000,000</option>
                        <option value="1000000, 100000000">Over $1,000,000</option>
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

export default Home;
