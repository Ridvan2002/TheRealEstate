import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCPnqdc5FptHd16E9yG-5wdIzBS6bZ_oTI",
    authDomain: "myrealestate-d4e9e.firebaseapp.com",
    projectId: "myrealestate-d4e9e",
    storageBucket: "myrealestate-d4e9e.firebasestorage.app",
    messagingSenderId: "421876792625",
    appId: "1:421876792625:web:9dc6529a6b4ef2bcf50410",
    measurementId: "G-55P8DZHBWY"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Your listings array (copy-paste it from your App.jsx)
const listings = [
    {
        id: 1,
        title: '5 Bedroom House',
        description: 'Large Home perfect for a family and located in a large neighborhood',
        price: '$2,900,000',
        address: '2312 Montview Dr NW, Atlanta, GA 30305',
        image: `/assets/image1.jpg`,
        bedrooms: 5,
        bathrooms: 4,
        squareFootage: 4500,
        description: 'This beautiful 5-bedroom house is perfect for a family looking for a spacious living space in a friendly neighborhood. The house features a large backyard, modern kitchen, and spacious bedrooms. It is located in a quiet area with easy access to schools, parks, and shopping centers. The master bedroom comes with an ensuite bathroom and walk-in closet. The home also includes a two-car garage, a fully-finished basement, and a large deck perfect for family gatherings.',
        additionalImages: [
          `/assets/image1_1.jpg`,
          `/assets/image1_2.jpg`,
          `/assets/image1_3.jpg`,
          `$/assets/image1_4.jpg`,
          `/assets/image1_5.jpg`,
          `/assets/image1_6.jpg`,
        ],
    },
    {
        id: 2,
        title: '5 Bedroom House',
        price: '$420,000',
        address: '842 Cascade Xing SW, Atlanta, GA 30331',
        image: `/assets/image2.jpg`,
        bedrooms: 5,
        bathrooms: 3,
        squareFootage: 3500,
        description: 'This impressive 5 bedroom, 3 bathroom house is a dream come true for anyone who values space, comfort, and luxury. Equipped with central air conditioning, a large kitchen with stainless steel appliances, and spacious garage with room for multiple vehicles, this property offers everything you need for a comfortable lifestyle. Each of the five bedrooms is generously sized, with the master featuring an en-suite bathroom with a soaking tub and separate shower. Whether you are entertaining guests in the formal dining area, relaxing in the living room, or enjoying the covered patio in the backyard, this house is the perfect place to call home.',
        additionalImages: [
            `/assets/image2_1.jpg`,
            `/assets/image2_2.jpg`,
            `/assets/image2_3.jpg`,
            `/assets/image2_4.jpg`,
            `/assets/image2_5.jpg`,
            `/assets/image2_6.jpg`,
        ],
    },
    {
        id: 3,
        title: '3 Bedroom House',
        price: '$325,000',
        address: '3666 Garrison Dr SW, Atlanta, GA 30331',
        image: `/assets/image3.jpg`,
        bedrooms: 3,
        bathrooms: 2,
        squareFootage: 2200,
        description: 'This 3-bedroom house offers great value for families or first-time homebuyers. The property features a spacious front and back yard, ideal for kids or pets. It has a modern kitchen, a cozy living room, and two full bathrooms. The location is convenient with nearby schools, shopping centers, and public transportation. The home is move-in ready with recent updates including new flooring and paint.',
        additionalImages: [
          `/assets/image3_1.jpg`,
          `/assets/image3_2.jpg`,
          `/assets/image3_3.jpg`,
          `/assets/image3_4.jpg`,
          `/assets/image3_5.jpg`,
          `/assets/image3_6.jpg`,
        ],
    },
    {
        id: 4,
        title: '2 Bedroom Condo',
        price: '$269,000',
        address: '171 Auburn Ave NE UNIT 521, Atlanta, GA 30303',
        image: `/assets/image4.jpg`,
        bedrooms: 2,
        bathrooms: 2,
        squareFootage: 1500,
        description: 'This 2-bedroom condo is fully furnished and ready for you to move in. It features a modern kitchen, a spacious living area, and two bathrooms. The condo is located in a secure building with amenities such as a gym and swimming pool. It\'s close to downtown, making it a great option for young professionals or small families. The unit also includes a private laundry room and a balcony with a city view.',
        additionalImages: [
          `/assets/image4_1.jpg`,
          `/assets/image4_2.jpg`,
          `/assets/image4_3.jpg`,
          `/assets/image4_4.jpg`,
          `/assets/image4_5.jpg`,
          `/assets/image4_6.jpg`,
        ],
    },
    {
        id: 5,
        title: '1 Bedroom Condo',
        price: '$165,000',
        address: '620 Peachtree St NE APT 1801, Atlanta, GA 30308',
        image: `/assets/image5.jpg`,
        bedrooms: 1,
        bathrooms: 1,
        squareFootage: 900,
        description: 'This minimalist 1-bedroom condo is perfect for someone looking to downsize or for a first-time homebuyer. The unit is simple yet stylish, with an open-concept living area and a modern kitchen. The bedroom is spacious with a large closet, and the bathroom is sleek with updated fixtures. The condo building offers amenities such as a fitness center and a community lounge.',
        additionalImages: [
          `/assets/image5_1.jpg`,
          `/assets/image5_2.jpg`,
          `/assets/image5_3.jpg`,
          `/assets/image5_4.jpg`,
          `/assets/image5_5.jpg`,
          `/assets/image5_6.jpg`,
        ],
    },
    {
        id: 6,
        title: '4 Bedroom House',
        price: '$289,000',
        address: '2555 County Line Rd SW, Atlanta, GA 30331',
        image: `/assets/image6.jpg`,
        bedrooms: 4,
        bathrooms: 3,
        squareFootage: 3000,
        description: 'This 4-bedroom brick house is a classic home with plenty of charm. The property boasts a huge backyard, ideal for gardening or outdoor activities. Inside, you\'ll find a traditional layout with a formal dining room, a large kitchen, and a cozy living room with a fireplace. The bedrooms are generously sized, and the master bedroom includes an ensuite bathroom. The house is located in a quiet neighborhood, close to parks and schools.',
        additionalImages: [
          `$/assets/image6_1.jpg`,
          `$/assets/image6_2.jpg`,
          `$/assets/image6_3.jpg`,
          `$/assets/image6_4.jpg`,
          `$/assets/image6_5.jpg`,
          `$/assets/image6_6.jpg`,
        ],
    },
    {
        id: 7,
        title: '1 Bedroom Condo',
        price: '$194,800',
        address: '238 Walker St SW UNIT 31, Atlanta, GA 30313',
        image: `/assets/image7.jpg`,
        bedrooms: 1,
        bathrooms: 1,
        squareFootage: 950,
        description: 'This 1-bedroom condo features an industrial design with exposed brick walls and high ceilings. The open-plan layout gives the space a spacious feel, and it\'s ready for you to add your own personal touches. The building is located in a vibrant area, close to shops, restaurants, and public transport. It\'s perfect for a single person or a couple looking for a stylish, urban living experience.',
        additionalImages: [
          `$/assets/image7_1.jpg`,
          `$/assets/image7_2.jpg`,
          `$/assets/image7_3.jpg`,
          `$/assets/image7_4.jpg`,
          `$/assets/image7_5.jpg`,
          `$/assets/image7_6.jpg`,
        ],
    },
    {
        id: 8,
        title: '3 Bedroom House',
        price: '$325,000',
        address: '1010 Mc Daniel St SW, Atlanta, GA 30310',
        image: `/assets/image8.jpg`,
        bedrooms: 3,
        bathrooms: 2,
        squareFootage: 2400,
        description: 'This 3-bedroom house is deceivingly spacious on the inside, with plenty of room for a growing family. The home features a large open-concept kitchen and living area, perfect for entertaining. The bedrooms are well-sized, and the master suite includes a walk-in closet and ensuite bathroom. The backyard is fully fenced, making it a great space for pets or children to play. Located in a family-friendly neighborhood, this home is close to schools and parks.',
        additionalImages: [
          `/assets/image8_1.jpg`,
          `/assets/image8_2.jpg`,
          `/assets/image8_3.jpg`,
          `/assets/image8_3.jpg`,
          `/assets/image8_4.jpg`,
          `/assets/image8_5.jpg`,
          `$/assets/image8_6.jpg`,
        ],
    },
    {
        id: 9,
        title: '3 Bedroom House',
        price: '$139,000',
        address: '2924 3rd Ave SW, Atlanta, GA 30315',
        image: `/assets/image9.jpg`,
        bedrooms: 3,
        bathrooms: 1,
        squareFootage: 1800,
        description: 'This 3-bedroom house is a budget-friendly option for those looking to invest in their first home. While the price is low, the house has plenty of personality with its unique layout and vintage charm. The home features a large living area, a functional kitchen, and three bedrooms. It\'s located in an up-and-coming neighborhood, making it a great opportunity for those looking to build equity. The property has a large backyard and a detached garage.',
        additionalImages: [
          `/assets/image9_1.jpg`,
          `/assets/image9_2.jpg`,
          `/assets/image9_3.jpg`,
          `/assets/image9_4.jpg`,
          `/assets/image9_5.jpg`,
          `/assets/image9_6.jpg`,
        ],
    },
];

async function uploadListings() {
  const listingsCollection = collection(db, "listings");

  for (const property of listings) {
    try {
      await addDoc(listingsCollection, property);
      console.log(`Uploaded: ${property.title}`);
    } catch (error) {
      console.error("Error uploading:", error);
    }
  }

  console.log("✅ All listings uploaded!");
}

uploadListings();