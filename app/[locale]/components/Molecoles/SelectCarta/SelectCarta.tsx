"use client";
import style from "@/app/[locale]/(routes)/acquista_page/dati_transazione/pagamento.module.scss";
import Image from "next/image";
import Visa from "@/public/icons/pagamenti/visa.svg";
import Mastercard from "@/public/icons/pagamenti/mastercard.svg";
import { useState, useEffect, useRef } from "react";

interface SelectCartaProps {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  selectedCard: string | null;
  setSelectedCard: (value: string | null) => void;
}

function SelectCarta({
  cardNumber,
  setCardNumber,
  selectedCard,
  setSelectedCard,
}: SelectCartaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCardSelect = (cardType: string) => {
    setSelectedCard(cardType);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const formatCardNumber = (number: string) => {
    // Rimuove tutti gli spazi e riformatta con spazi ogni 4 cifre
    return number
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatCardNumber(e.target.value);
    setCardNumber(formattedNumber);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mx-auto">
      <div className="flex relative gap-4" ref={dropdownRef}>
        <button
          id="states-button"
          data-dropdown-toggle="dropdown-states"
          className="flex-shrink-0 inline-flex items-center px-4 rounded-md shadow-sm text-sm font-medium text-center text-gray-500 bg-milk border"
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
          className={`absolute left-0 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow ${
            isOpen ? "block" : "hidden"
          }`}
          style={{ top: "100%" }}
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="states-button"
          >
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleCardSelect("Visa")}
              >
                <div className="inline-flex items-center gap-2">
                  <Image src={Visa} alt="Visa" width={24} height={24} />
                  Visa
                </div>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleCardSelect("Mastercard")}
              >
                <div className="inline-flex items-center gap-2">
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
          type="text"
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
          onChange={handleCardNumberChange}
          maxLength={19} // 16 cifre + 3 spazi
        />
      </div>
    </div>
  );
}

export default SelectCarta;
