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
  selectedDate: Date,
  tickets: { type: string; quantity: number }[],
  availableDatesTheatre: Date[],
  userData: UserData,
  paymentMethod: string
) => {
  const db = getDatabase();
  const ordersRef = ref(db, "orders");
  const newOrderRef = push(ordersRef);

  // Normalizza le date per il confronto
  const normalizedSelectedDate = selectedDate.setHours(0, 0, 0, 0);
  const isTeatroDate = availableDatesTheatre.some(
    (date) => date.setHours(0, 0, 0, 0) === normalizedSelectedDate
  );

  // Crea l'oggetto ordine
  const order = {
    date: selectedDate.toLocaleDateString("it-IT"),
    tickets: isTeatroDate
      ? tickets
      : tickets.filter(
          (ticket) => ticket.type === "Intero" || ticket.type === "Ridotto"
        ),
    timestamp: new Date().toLocaleString("it-IT"),
    userId: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    paymentInfo: {
      cardName: userData.paymentInfo.cardName,
      cardNumber: userData.paymentInfo.cardNumber,
      expiryDate: userData.paymentInfo.expiryDate,
      paymentMethod: userData.paymentInfo.paymentMethod,
      selectedCard: userData.paymentInfo.selectedCard,
    },
  };

  // Salva i dati nel database sotto una nuova chiave
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
