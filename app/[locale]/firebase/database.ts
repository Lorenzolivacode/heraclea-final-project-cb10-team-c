import { getDatabase, ref, set, push } from "firebase/database"; // Importa le funzioni del database

// Funzione per salvare i dati su Firebase Realtime Database
export const saveToDatabase = (
  selectedDate: Date,
  tickets: { type: string; quantity: number }[]
) => {
  const db = getDatabase(); // Ottieni il riferimento al database
  const ordersRef = ref(db, "orders"); // Crea un riferimento alla collezione "orders" nel database
  const newOrderRef = push(ordersRef); // Crea una nuova chiave per l'ordine

  // Crea un oggetto ordine
  const order = {
    date: selectedDate.toISOString(), // Salva la data in formato ISO
    tickets,
    timestamp: new Date().toISOString(), // Salva il momento dell'acquisto
  };

  // Salva i dati nel database sotto una nuova chiave
  set(newOrderRef, order)
    .then(() => {
      console.log("Ordine salvato con successo!");
    })
    .catch((error) => {
      console.error("Errore nel salvare l'ordine:", error);
    });
};
