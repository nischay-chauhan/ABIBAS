// initializeDatabase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { config } from 'dotenv';
config();

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const initializeDatabase = () => {
  const userId = 'user123';
  const itemId = 'item456';

  const data = {
    users: {
      [userId]: {
        cart: {
          [itemId]: {
            id: 1,
            name: "Wild Rider Layers Unisex Sneakers",
            price: 121,
            image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380697/02/sv01/fnd/IND/fmt/png/,Wild-Rider-Layers-Unisex-Sneakers",
            description: "With design elements inspired by the movement and motion of city life, the Wild Rider Layers Unisex Sneakers brings a fresh new dimension to the iconic Rider family. We've layered a rich mix of premium leather, suede and hairy suede onto a nylon upper to create texture and a raw edgy look that is pure street. The IMEVA midsole and rubber outsole ensure combined lightweight comfort and great traction to take you forward, further and faster through your day and beyond.",
            quantity: 1,
            rating: {
              rate: 3.9,
              count: 120
            }
          }
        }
      }
    }
  };

  set(ref(database), data)
    .then(() => {
      console.log('Database initialized successfully!');
    })
    .catch((error) => {
      console.error('Error initializing database:', error);
    });
};

initializeDatabase();
