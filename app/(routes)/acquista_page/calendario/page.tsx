"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import arrowLeft from "@/public/icons/calendar/arrow-left-calendar.svg";
import arrowRight from "@/public/icons/calendar/arrow-right-calendar.svg";
import Image from "next/image";
import Button from "@/app/components/Atom/Button/Button";
import Counter from "@/app/components/Atom/Counter/Counter";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

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
    setSelectedDate(selected);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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

  return (
    <>
      <div className="bg-milk flex flex-col items-center justify-center h-screen">
        <h1 className="my-5 font-semibold">Acquista </h1>
        <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 mx-auto p-4 ">
          <div className="bg-white border-2 border-sienna shadow-md shadow-gray-400 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 ">
              <button onClick={handlePrevMonth} className="text-white">
                <Image src={arrowLeft} width={35} height={35} alt="back" />
              </button>
              <h2 className="text-sienna text-lg font-bold tracking-tight">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button onClick={handleNextMonth} className="text-white">
                <Image src={arrowRight} width={35} height={35} alt="next" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 p-4">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-grayLight"
                >
                  {day}
                </div>
              ))}
              {Array(firstDayOfMonth)
                .fill(null)
                .map((_, idx) => (
                  <div key={idx}></div>
                ))}
              {daysInMonth.map((day) => (
                <div
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className="text-center py-2 text-lg cursor-pointer hover:bg-grayLight"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modale */}
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

              {/* bigietto intero*/}
              <div className="flex flex-row">
                <div className="w-60 h-16 bg-white border border-sienna rounded-md">
                  <div className="border border-b-sienna ps-2 p-1 flex flex-row justify-between">
                    <span className="text-sienna text-sm">Intero</span>
                  </div>
                  <div className="text-sienna ps-2 font-bold">€ 4,00</div>
                </div>
                <div className="flex justify-center items-center ms-2">
                  <Counter />
                </div>
              </div>

              {/*biglietto ridotto*/}
              <div className="flex flex-row">
                <div className="w-60 h-16 mt-5 bg-white border border-sienna rounded-md">
                  <div className="border border-b-sienna ps-2 p-1 flex flex-row justify-between">
                    <span className="text-sienna text-sm">
                      Ridotto (minori di 16 anni)
                    </span>
                  </div>
                  <div className="text-sienna ps-2 font-bold">€ 2,00</div>
                </div>
                <div className="flex justify-center items-center ms-2 mt-3">
                  <Counter />
                </div>
              </div>

              {/*acquista*/}
              <div className="flex justify-center items-center mt-5">
                <Button
                  text="Acquista"
                  onClick={() => router.push("/acquista_page/dati_transazione")}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
