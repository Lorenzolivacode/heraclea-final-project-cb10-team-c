"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDatabase, ref, set, push } from "firebase/database";
import { auth } from "@/app/[locale]/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import arrowLeft from "@/public/icons/calendar/arrow-left-calendar.svg";
import arrowLeftHover from "@/public/icons/calendar/arrow-left-sienna.svg";
import arrowRight from "@/public/icons/calendar/arrow-right-calendar.svg";
import arrowRightHover from "@/public/icons/calendar/arrow-right-sienna.svg";
import Image from "next/image";
import Button from "@/app/[locale]/components/Atom/Button/Button";
import Counter from "@/app/[locale]/components/Atom/Counter/Counter";

//Date Eventi
const availableDates = [
  new Date(2024, 8, 18),
  new Date(2024, 8, 20),
  new Date(2024, 8, 25),
  new Date(2024, 9, 5),
];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<"left" | "right" | null>(
    null
  );
  const [interoCount, setInteroCount] = useState(0);
  const [ridottoCount, setRidottoCount] = useState(0);
  const [teatriCount, setTeatriCount] = useState(0);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const db = getDatabase();

  // Prezzi dei biglietti
  const [fullTicketPrice] = useState(4);
  const [reducedTicketPrice] = useState(2);
  const [eventTicketPrice] = useState(12);

  // Funzione per generare i giorni del mese
  const generateCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: days }, (_, i) => i + 1);
    setFirstDayOfMonth(firstDay);
    setDaysInMonth(daysArray);
  };

  useEffect(() => {
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setCurrentDate(newDate);
  };

  const handleDayClick = (day: number) => {
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const today = new Date();
    if (selected.getTime() >= today.setHours(0, 0, 0, 0)) {
      setSelectedDate(selected);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const saveToDatabase = (
    selectedDate: Date,
    tickets: { type: string; quantity: number; price: number }[]
  ) => {
    const ordersRef = ref(db, "orders");
    const newOrderRef = push(ordersRef);

    const order = {
      date: selectedDate.toISOString(),
      tickets,
      timestamp: new Date().toISOString(),
      userId: user ? user.uid : null, // Salva l'ID utente se autenticato
    };

    set(newOrderRef, order)
      .then(() => {
        console.log("Ordine salvato con successo!");
      })
      .catch((error) => {
        console.error("Errore nel salvare l'ordine:", error);
      });
  };

  const calculateTotalPrice = () => {
    return (
      interoCount * fullTicketPrice +
      ridottoCount * reducedTicketPrice +
      teatriCount * eventTicketPrice
    ).toFixed(2);
  };

  const handlePurchase = () => {
    const tickets = [
      { type: "Intero", quantity: interoCount, price: 4.0 },
      { type: "Ridotto", quantity: ridottoCount, price: 2.0 },
      { type: "Ticket Teatri di Pietra", quantity: teatriCount, price: 12.0 },
    ];

    saveToDatabase(selectedDate!, tickets); // Salva i dati nel database

    router.push("/acquista_page/dati_transazione"); // Reindirizza alla pagina di transazione
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Funzione per verificare se la data è disponibile
  const isDateAvailable = (day: number) => {
    const dateToCheck = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return availableDates.some(
      (date) =>
        date.getFullYear() === dateToCheck.getFullYear() &&
        date.getMonth() === dateToCheck.getMonth() &&
        date.getDate() === dateToCheck.getDate()
    );
  };

  return (
    <>
      <div className="bg-milk flex flex-col items-center justify-evenly h-screen">
        <h1 className="my-5 font-semibold">Acquista </h1>
        <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 mx-auto p-4 ">
          <div className="bg-white mb-24 border-2 border-sienna shadow-md shadow-gray-400 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 ">
              <button
                onClick={handlePrevMonth}
                onMouseEnter={() => setHoveredButton("left")}
                onMouseLeave={() => setHoveredButton(null)}
                className="text-white p-2 rounded-full"
              >
                <Image
                  src={hoveredButton === "left" ? arrowLeftHover : arrowLeft}
                  width={35}
                  height={35}
                  alt="back"
                />
              </button>

              <h2 className="text-sienna text-lg font-bold tracking-tight">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={handleNextMonth}
                onMouseEnter={() => setHoveredButton("right")}
                onMouseLeave={() => setHoveredButton(null)}
                className="text-white p-2 rounded-full"
              >
                <Image
                  src={hoveredButton === "right" ? arrowRightHover : arrowRight}
                  width={35}
                  height={35}
                  alt="next"
                />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 p-4">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-grayStone"
                >
                  {day}
                </div>
              ))}
              {Array(firstDayOfMonth)
                .fill(null)
                .map((_, idx) => (
                  <div key={idx}></div>
                ))}
              {daysInMonth.map((day) => {
                const selectedDate = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                );
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isPastDay = selectedDate.getTime() < today.getTime();
                const available = isDateAvailable(day);

                return (
                  <div
                    key={day}
                    onClick={() =>
                      !isPastDay && available && handleDayClick(day)
                    }
                    className={`text-center py-2 text-lg cursor-pointer ${
                      isPastDay || !available
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-sienna hover:bg-grayLight"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedDate && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-milk w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="py-4 px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-xl font-bold text-sienna">
                  Seleziona il tuo biglietto
                </p>
                <button
                  onClick={closeModal}
                  className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-sienna"
                >
                  ✕
                </button>
              </div>
              <div className="text-xl font-semibold text-sienna mb-5">
                {selectedDate.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              {/* Biglietti */}
              <div className="flex flex-row">
                <div className="w-60 h-16 bg-white border border-sienna rounded-md">
                  <div className="border border-b-sienna ps-2 p-1 flex flex-row justify-between">
                    <span className="text-sienna text-sm">Intero</span>
                  </div>
                  <div className="text-sienna ps-2 font-bold">
                    € {fullTicketPrice.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-center items-center ms-2">
                  <Counter value={interoCount} onChange={setInteroCount} />
                </div>
              </div>

              <div className="flex flex-row">
                <div className="w-60 h-16 mt-5 bg-white border border-sienna rounded-md">
                  <div className="border border-b-sienna ps-2 p-1 flex flex-row justify-between">
                    <span className="text-sienna text-sm">Ridotto</span>
                  </div>
                  <div className="text-sienna ps-2 font-bold">
                    € {reducedTicketPrice.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-center items-center ms-2 mt-5">
                  <Counter value={ridottoCount} onChange={setRidottoCount} />
                </div>
              </div>

              <div className="flex flex-row">
                <div className="w-60 h-16 mt-5 bg-white border border-sienna rounded-md">
                  <div className="border border-b-sienna ps-2 p-1 flex flex-row justify-between">
                    <span className="text-sienna text-sm">
                      Ticket Teatri di Pietra
                    </span>
                  </div>
                  <div className="text-sienna ps-2 font-bold">
                    € {eventTicketPrice.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-center items-center ms-2 mt-5">
                  <Counter value={teatriCount} onChange={setTeatriCount} />
                </div>
              </div>

              {/* Totale */}
              <div className="text-xl font-semibold text-sienna mt-5">
                Totale: € {calculateTotalPrice()}
              </div>

              <div className="flex justify-center items-center mt-5">
                <Button onClick={handlePurchase} text="Acquista" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
