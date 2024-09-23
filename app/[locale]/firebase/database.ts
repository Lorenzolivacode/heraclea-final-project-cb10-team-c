import { getDatabase, ref, set, push } from "firebase/database";

// Interfaccia per i dati utente
interface UserData {
  firstName: string;
  lastName: string;
  email: string | null;
  paymentInfo: {
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    paymentMethod: string;
    selectedCard: string;
  };
}

// Funzione per salvare i dati utente nel database
export const saveUserData = async (uid: string, userData: UserData) => {
  const db = getDatabase();
  const userRef = ref(db, `users/${uid}`);
  await set(userRef, userData);
};

// Funzione per salvare gli ordini nel database
export const saveToDatabase = async (
  uid: string, // Usare uid invece di email
  selectedDate: Date,
  tickets: { type: string; quantity: number; price: number; QRcode: number }[],
  availableDatesTheatre: Date[],
  userData: UserData,
  paymentMethod: string
) => {
  const db = getDatabase();
  const ordersRef = ref(db, "orders");
  const newOrderRef = push(ordersRef);

  const normalizedSelectedDate = new Date(selectedDate).setHours(0, 0, 0, 0);
  const isTeatroDate = availableDatesTheatre.some(
    (date) => new Date(date).setHours(0, 0, 0, 0) === normalizedSelectedDate
  );

  // Calcolo del totale
  const total = tickets.reduce(
    (acc, ticket) => acc + ticket.quantity * ticket.price,
    0
  );

  // Crea l'oggetto ordine
  const order = {
    date: selectedDate.toLocaleDateString("it-IT"),
    tickets: isTeatroDate
      ? tickets
      : tickets.filter(
          (ticket) =>
            ticket.type === "Biglietto intero" ||
            ticket.type === "Biglietto ridotto"
        ),
    timestamp: new Date().toLocaleString("it-IT"),
    userId: uid, // Usare uid invece di email

    firstName: userData.firstName,
    lastName: userData.lastName,
    paymentInfo: {
      cardName: userData.paymentInfo.cardName,
      cardNumber: userData.paymentInfo.cardNumber,
      expiryDate: userData.paymentInfo.expiryDate,
      paymentMethod: paymentMethod, // Passa direttamente il metodo di pagamento
      selectedCard: userData.paymentInfo.selectedCard,
    },
    total, // Aggiungere il totale
  };

  try {
    await set(newOrderRef, order);
    console.log("Ordine salvato con successo!", order);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Errore nel salvare l'ordine:", error.message);
    } else {
      console.error("Errore sconosciuto:", error);
    }
  }
};
