"use client";
import style from "@/app/(routes)/acquista/dati_pagamento/pagamento.module.scss";
import Image from "next/image";
import Visa from "@/public/icons/pagamenti/visa.svg";
import Mastercard from "@/public/icons/pagamenti/mastercard.svg";
import { useState, useEffect, useRef } from "react";

function SelectCarta() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null); // Stato per la carta selezionata
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCardSelect = (cardType: string) => {
    setSelectedCard(cardType);
    setIsOpen(false); // Chiude il dropdown dopo la selezione
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form className="max-w-sm mx-auto">
      <div className="flex relative" ref={dropdownRef}>
        <button
          id="states-button"
          data-dropdown-toggle="dropdown-states"
          className="flex-shrink-0 z-10 inline-flex items-center px-4 rounded-md shadow-sm text-sm font-medium text-center text-gray-500 bg-milk border"
          type="button"
          onClick={toggleDropdown}
        >
          {selectedCard === "Visa" && (
            <Image src={Visa} alt="Visa" width={24} height={24} />
          )}
          {selectedCard === "Mastercard" && (
            <Image src={Mastercard} alt="Mastercard" width={24} height={24} />
          )}
          {!selectedCard && (
            <>
              Card{" "}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </>
          )}
        </button>
        <div
          id="dropdown-states"
          className={`z-10 absolute left-0 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 ${
            isOpen ? "block" : "hidden"
          }`}
          style={{ top: "100%" }} // Posiziona il dropdown direttamente sotto il pulsante
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="states-button"
          >
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleCardSelect("Visa")}
              >
                <div className="inline-flex items-center">
                  <Image src={Visa} alt="Visa" width={24} height={24} />
                  Visa
                </div>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleCardSelect("Mastercard")}
              >
                <div className="inline-flex items-center">
                  <Image
                    src={Mastercard}
                    alt="Mastercard"
                    width={24}
                    height={24}
                  />
                  Mastercard
                </div>
              </button>
            </li>
          </ul>
        </div>
        <input
          className={style.input_field}
          type="number"
          placeholder="0000 0000 0000 0000"
        />
      </div>
    </form>
  );
}

export default SelectCarta;
