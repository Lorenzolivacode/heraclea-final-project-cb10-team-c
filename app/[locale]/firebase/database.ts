import { getDatabase, ref, set, push } from "firebase/database";

// Funzione per salvare i dati su Firebase Realtime Database
export const saveToDatabase = (
  selectedDate: Date,
  tickets: { type: string; quantity: number }[],
  availableDatesTheatre: Date[]
) => {
  const db = getDatabase();
  const ordersRef = ref(db, "orders");
  const newOrderRef = push(ordersRef);

  // Controlla se la data selezionata è tra le date con biglietti del teatro
  const isTeatroDate = availableDatesTheatre.some(
    (date) => date.getTime() === selectedDate.getTime()
  );

  let order;

  if (isTeatroDate) {
    // Ordine con tutti i biglietti
    order = {
      date: selectedDate.toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      tickets,
      timestamp: new Date().toLocaleString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  } else {
    // Ordine solo con biglietti intero e ridotto
    const filteredTickets = tickets.filter(
      (ticket) => ticket.type === "Intero" || ticket.type === "Ridotto"
    );

    order = {
      date: selectedDate.toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      tickets: filteredTickets,
      timestamp: new Date().toLocaleString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }

  // Salva i dati nel database sotto una nuova chiave
  set(newOrderRef, order)
    .then(() => {
      console.log("Ordine salvato con successo!", order);
    })
    .catch((error) => {
      console.error("Errore nel salvare l'ordine:", error.message, error.code);
    });
};
