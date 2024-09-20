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
    date: selectedDate.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }), // Formato gg/mm/aaaa
    tickets,
    timestamp: new Date().toLocaleString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }), // Aggiunge anche ora e minuti
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
