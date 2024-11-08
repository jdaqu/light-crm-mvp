import { db } from "../../../firebaseConfig"; 
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ClientModel } from "../models/ClientModel";

// Define los tipos para los datos del cliente
export interface Client {
    id: string;
    name: string;
    budget: string;
    phone: string;
    characteristics: string;
  }
  


// Referencia a la colección de clientes
const clientsCollection = collection(db, "clients");

// Obtener todos los clientes en tiempo real
export const getClientsRealtime = (callback: (clients: Client[]) => void) => {
    return onSnapshot(clientsCollection, (snapshot) => {
        const clientsData: Client[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        })) as Client[]; // Usa `as Client[]` para ayudar a TypeScript a reconocer el tipo
        callback(clientsData);
    });
};

// Agregar un nuevo cliente
export const addClient = async (clientData: ClientModel) => {
  try {
    const docRef = await addDoc(clientsCollection, clientData);
    return { id: docRef.id, ...clientData };
  } catch (error) {
    console.error("Error adding client:", error);
    throw error;
  }
};

// Actualizar un cliente existente
export const updateClient = async (clientId: string, updatedData: Partial<{ name: string; budget: string; phone: string; characteristics: string }>) => {
  try {
    const clientDoc = doc(clientsCollection, clientId);
    await updateDoc(clientDoc, updatedData);
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

// Eliminar un cliente
export const deleteClient = async (clientId: string) => {
  try {
    const clientDoc = doc(clientsCollection, clientId);
    await deleteDoc(clientDoc);
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};
