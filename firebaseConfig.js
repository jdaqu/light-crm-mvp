import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics"; 
import { getFirestore, collection, addDoc } from "firebase/firestore";


// MOVE THIS TO THE .ENV FILE!!
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export const agregarDatoDePrueba = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "pruebas"), data);
    console.log("Documento agregado con ID: ", docRef.id);
  } catch (e) {
    console.error("Error al agregar el documento: ", e);
  }
};

export { db };