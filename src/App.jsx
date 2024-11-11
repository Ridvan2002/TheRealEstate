import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'; 
import Home from './Home'; 
import ListProperty from './ListProperty';
import Wishlist from './Wishlist';
import PropertyDetails from './PropertyDetails'; 
import Buy from './Buy';
import PrivateRoute from './components/PrivateRoute';
import Auth from './components/Auth'; 
import { AuthProvider, useAuth } from './context/AuthContext'; 


function App() {
    
    const isProduction = process.env.NODE_ENV === 'production';
    const basePath = isProduction ? '/TheRealEstate' : '';
  
    const [listings, setListings] = useState([
      {
          id: 1,
          title: '5 Bedroom House',
          description: 'Large Home perfect for a family and located in a large neighborhood',
          price: '$2,900,000',
          address: '2312 Montview Dr NW, Atlanta, GA 30305',
          image: `${basePath}/assets/image1.jpg`,
          bedrooms: 5,
          bathrooms: 4,
          squareFootage: 4500,
          description: 'This beautiful 5-bedroom house is perfect for a family looking for a spacious living space in a friendly neighborhood. The house features a large backyard, modern kitchen, and spacious bedrooms. It is located in a quiet area with easy access to schools, parks, and shopping centers. The master bedroom comes with an ensuite bathroom and walk-in closet. The home also includes a two-car garage, a fully-finished basement, and a large deck perfect for family gatherings.',
          additionalImages: [
            `${basePath}/assets/image1_1.jpg`,
            `${basePath}/assets/image1_2.jpg`,
            `${basePath}/assets/image1_3.jpg`,
            `${basePath}/assets/image1_4.jpg`,
            `${basePath}/assets/image1_5.jpg`,
            `${basePath}/assets/image1_6.jpg`,
          ],
      },
      {
          id: 2,
          title: '5 Bedroom House',
          price: '$420,000',
          address: '842 Cascade Xing SW, Atlanta, GA 30331',
          image: `${basePath}/assets/image2.jpg`,
          bedrooms: 5,
          bathrooms: 3,
          squareFootage: 3500,
          description: 'This impressive 5 bedroom, 3 bathroom house is a dream come true for anyone who values space, comfort, and luxury. Equipped with central air conditioning, a large kitchen with stainless steel appliances, and spacious garage with room for multiple vehicles, this property offers everything you need for a comfortable lifestyle. Each of the five bedrooms is generously sized, with the master featuring an en-suite bathroom with a soaking tub and separate shower. Whether you are entertaining guests in the formal dining area, relaxing in the living room, or enjoying the covered patio in the backyard, this house is the perfect place to call home.',
          additionalImages: [
              `${basePath}/assets/image2_1.jpg`,
              `${basePath}/assets/image2_2.jpg`,
              `${basePath}/assets/image2_3.jpg`,
              `${basePath}/assets/image2_4.jpg`,
              `${basePath}/assets/image2_5.jpg`,
              `${basePath}/assets/image2_6.jpg`,
          ],
      },
      {
          id: 3,
          title: '3 Bedroom House',
          price: '$325,000',
          address: '3666 Garrison Dr SW, Atlanta, GA 30331',
          image: `${basePath}/assets/image3.jpg`,
          bedrooms: 3,
          bathrooms: 2,
          squareFootage: 2200,
          description: 'This 3-bedroom house offers great value for families or first-time homebuyers. The property features a spacious front and back yard, ideal for kids or pets. It has a modern kitchen, a cozy living room, and two full bathrooms. The location is convenient with nearby schools, shopping centers, and public transportation. The home is move-in ready with recent updates including new flooring and paint.',
          additionalImages: [
            `${basePath}/assets/image3_1.jpg`,
            `${basePath}/assets/image3_2.jpg`,
            `${basePath}/assets/image3_3.jpg`,
            `${basePath}/assets/image3_4.jpg`,
            `${basePath}/assets/image3_5.jpg`,
            `${basePath}/assets/image3_6.jpg`,
          ],
      },
      {
          id: 4,
          title: '2 Bedroom Condo',
          price: '$269,000',
          address: '171 Auburn Ave NE UNIT 521, Atlanta, GA 30303',
          image: `${basePath}/assets/image4.jpg`,
          bedrooms: 2,
          bathrooms: 2,
          squareFootage: 1500,
          description: 'This 2-bedroom condo is fully furnished and ready for you to move in. It features a modern kitchen, a spacious living area, and two bathrooms. The condo is located in a secure building with amenities such as a gym and swimming pool. It\'s close to downtown, making it a great option for young professionals or small families. The unit also includes a private laundry room and a balcony with a city view.',
          additionalImages: [
            `${basePath}/assets/image4_1.jpg`,
            `${basePath}/assets/image4_2.jpg`,
            `${basePath}/assets/image4_3.jpg`,
            `${basePath}/assets/image4_4.jpg`,
            `${basePath}/assets/image4_5.jpg`,
            `${basePath}/assets/image4_6.jpg`,
          ],
      },
      {
          id: 5,
          title: '1 Bedroom Condo',
          price: '$165,000',
          address: '620 Peachtree St NE APT 1801, Atlanta, GA 30308',
          image: `${basePath}/assets/image5.jpg`,
          bedrooms: 1,
          bathrooms: 1,
          squareFootage: 900,
          description: 'This minimalist 1-bedroom condo is perfect for someone looking to downsize or for a first-time homebuyer. The unit is simple yet stylish, with an open-concept living area and a modern kitchen. The bedroom is spacious with a large closet, and the bathroom is sleek with updated fixtures. The condo building offers amenities such as a fitness center and a community lounge.',
          additionalImages: [
            `${basePath}/assets/image5_1.jpg`,
            `${basePath}/assets/image5_2.jpg`,
            `${basePath}/assets/image5_3.jpg`,
            `${basePath}/assets/image5_4.jpg`,
            `${basePath}/assets/image5_5.jpg`,
            `${basePath}/assets/image5_6.jpg`,
          ],
      },
      {
          id: 6,
          title: '4 Bedroom House',
          price: '$289,000',
          address: '2555 County Line Rd SW, Atlanta, GA 30331',
          image: `${basePath}/assets/image6.jpg`,
          bedrooms: 4,
          bathrooms: 3,
          squareFootage: 3000,
          description: 'This 4-bedroom brick house is a classic home with plenty of charm. The property boasts a huge backyard, ideal for gardening or outdoor activities. Inside, you\'ll find a traditional layout with a formal dining room, a large kitchen, and a cozy living room with a fireplace. The bedrooms are generously sized, and the master bedroom includes an ensuite bathroom. The house is located in a quiet neighborhood, close to parks and schools.',
          additionalImages: [
            `${basePath}/assets/image6_1.jpg`,
            `${basePath}/assets/image6_2.jpg`,
            `${basePath}/assets/image6_3.jpg`,
            `${basePath}/assets/image6_4.jpg`,
            `${basePath}/assets/image6_5.jpg`,
            `${basePath}/assets/image6_6.jpg`,
          ],
      },
      {
          id: 7,
          title: '1 Bedroom Condo',
          price: '$194,800',
          address: '238 Walker St SW UNIT 31, Atlanta, GA 30313',
          image: `${basePath}/assets/image7.jpg`,
          bedrooms: 1,
          bathrooms: 1,
          squareFootage: 950,
          description: 'This 1-bedroom condo features an industrial design with exposed brick walls and high ceilings. The open-plan layout gives the space a spacious feel, and it\'s ready for you to add your own personal touches. The building is located in a vibrant area, close to shops, restaurants, and public transport. It\'s perfect for a single person or a couple looking for a stylish, urban living experience.',
          additionalImages: [
            `${basePath}/assets/image7_1.jpg`,
            `${basePath}/assets/image7_2.jpg`,
            `${basePath}/assets/image7_3.jpg`,
            `${basePath}/assets/image7_4.jpg`,
            `${basePath}/assets/image7_5.jpg`,
            `${basePath}/assets/image7_6.jpg`,
          ],
      },
      {
          id: 8,
          title: '3 Bedroom House',
          price: '$325,000',
          address: '1010 Mc Daniel St SW, Atlanta, GA 30310',
          image: `${basePath}/assets/image8.jpg`,
          bedrooms: 3,
          bathrooms: 2,
          squareFootage: 2400,
          description: 'This 3-bedroom house is deceivingly spacious on the inside, with plenty of room for a growing family. The home features a large open-concept kitchen and living area, perfect for entertaining. The bedrooms are well-sized, and the master suite includes a walk-in closet and ensuite bathroom. The backyard is fully fenced, making it a great space for pets or children to play. Located in a family-friendly neighborhood, this home is close to schools and parks.',
          additionalImages: [
            `${basePath}/assets/image8_1.jpg`,
            `${basePath}/assets/image8_2.jpg`,
            `${basePath}/assets/image8_3.jpg`,
            `${basePath}/assets/image8_3.jpg`,
            `${basePath}/assets/image8_4.jpg`,
            `${basePath}/assets/image8_5.jpg`,
            `${basePath}/assets/image8_6.jpg`,
          ],
      },
      {
          id: 9,
          title: '3 Bedroom House',
          price: '$139,000',
          address: '2924 3rd Ave SW, Atlanta, GA 30315',
          image: `${basePath}/assets/image9.jpg`,
          bedrooms: 3,
          bathrooms: 1,
          squareFootage: 1800,
          description: 'This 3-bedroom house is a budget-friendly option for those looking to invest in their first home. While the price is low, the house has plenty of personality with its unique layout and vintage charm. The home features a large living area, a functional kitchen, and three bedrooms. It\'s located in an up-and-coming neighborhood, making it a great opportunity for those looking to build equity. The property has a large backyard and a detached garage.',
          additionalImages: [
            `${basePath}/assets/image9_1.jpg`,
            `${basePath}/assets/image9_2.jpg`,
            `${basePath}/assets/image9_3.jpg`,
            `${basePath}/assets/image9_4.jpg`,
            `${basePath}/assets/image9_5.jpg`,
            `${basePath}/assets/image9_6.jpg`,
          ],
      },
    ]);
  
    const [wishlist, setWishlist] = useState([]);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [redirectPath, setRedirectPath] = useState('/');

    const addToWishlist = (property) => {
        if (!wishlist.some(item => item.id === property.id)) {
            setWishlist([...wishlist, property]);
        }
    };

    const removeFromWishlist = (property) => {
        setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== property.id));
    };

    const handleOpenAuthModal = (path) => {
        setRedirectPath(path);
        setAuthModalOpen(true);
    };

    const handleCloseAuthModal = () => setAuthModalOpen(false);

    return (
        <AuthProvider>
            <Router basename={basePath}>
                <AppContent
                    listings={listings}
                    setListings={setListings}
                    wishlist={wishlist}
                    addToWishlist={addToWishlist}
                    removeFromWishlist={removeFromWishlist}
                    setWishlist={setWishlist}
                    isAuthModalOpen={isAuthModalOpen}
                    handleOpenAuthModal={handleOpenAuthModal}
                    handleCloseAuthModal={handleCloseAuthModal}
                    redirectPath={redirectPath}
                    basePath={basePath}
                />
            </Router>
        </AuthProvider>
    );
}

function AppContent({ listings, setListings, wishlist, addToWishlist, removeFromWishlist, isAuthModalOpen, handleOpenAuthModal, handleCloseAuthModal, redirectPath, basePath }) {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    const handleMenuLinkClick = (path, requiresAuth) => {
        setMenuOpen(false); 
        if (requiresAuth && !isLoggedIn) {
            handleOpenAuthModal(path);
        } else {
            navigate(path);
        }
    };

    const addListing = (newListing) => {
        setListings((prevListings) => [...prevListings, newListing]);
    };

    const handleAddToWishlist = (property) => {
        if (!isLoggedIn) {
            handleOpenAuthModal('/wishlist');
        } else {
            addToWishlist(property);
        }
    };

    const handleBuyNow = (property) => {
        if (!isLoggedIn) {
            handleOpenAuthModal(`/buy/${property.id}`);
        } else {
            navigate(`/buy/${property.id}`, { state: { property } });
        }
    };

    const handleCloseModalAndRedirect = () => {
        handleCloseAuthModal();
        if (isLoggedIn) {
            navigate(redirectPath);
        }
    };

    return (
        <div>
            <nav className="navbar">

                <div className="theTitle">
                    <img src={`${basePath}/house.png`} alt="house icon" className="title-icon" />
                    <span className="title-text">TheRealEstate</span>
                </div>
                <button className="hamburger" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                {/* Nav links, visible based on isMenuOpen */}
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={() => handleMenuLinkClick('/')}>Home</Link></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuLinkClick('/wishlist', true); }}>Wishlist</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleMenuLinkClick('/list-property', true); }}>Sell</a></li>
                    <li className="nav-sign-in">
                        {isLoggedIn ? (
                            <button onClick={logout} className="btn-signout">Sign out</button>
                        ) : (
                            <button onClick={() => handleOpenAuthModal()} className="btn-signin">Sign in</button>
                        )}
                    </li>
                </ul>
                <div className="nav-sign-in-large">
                    {isLoggedIn ? (
                        <button onClick={logout} className="btn-signout">Sign out</button>
                    ) : (
                        <button onClick={() => handleOpenAuthModal()} className="btn-signin">Sign in</button>
                    )}
                </div>
            </nav>
            <Routes>
                <Route 
                    path="/" 
                    element={<Home 
                                listings={listings} 
                                addToWishlist={handleAddToWishlist} 
                                handleOpenAuthModal={handleOpenAuthModal}
                             />} 
                />
                <Route 
                    path="/property/:id" 
                    element={<PropertyDetails 
                                listings={listings} 
                                onBuy={handleBuyNow} 
                                handleOpenAuthModal={handleOpenAuthModal}
                             />} 
                />
                <Route 
                    path="/wishlist" 
                    element={
                        <PrivateRoute openAuthModal={handleOpenAuthModal}>
                            <Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path="/list-property" 
                    element={
                        <PrivateRoute openAuthModal={handleOpenAuthModal}>
                            <ListProperty addListing={addListing} />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/buy/:id" 
                    element={
                        <PrivateRoute openAuthModal={handleOpenAuthModal}>
                            <Buy />
                        </PrivateRoute>
                    } 
                />
            </Routes>
            <Auth isOpen={isAuthModalOpen} onClose={handleCloseModalAndRedirect} />
        </div>
    );
}

export default App;