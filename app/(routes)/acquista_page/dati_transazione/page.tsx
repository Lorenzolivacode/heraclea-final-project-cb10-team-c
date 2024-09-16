"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import style from "@/app/(routes)/acquista_page/dati_pagamento/pagamento.module.scss";
import HeroImage from "@/public/assets/maschera.webp";
import ApplePay from "@/app/components/Atom/ApplepayBtn/ApplePayBtn";
import GooglePayBtn from "@/app/components/Atom/GooglePayBtn/GooglePayBtn";
import Paypal from "@/public/icons/pagamenti/paypal.svg";
import Button from "@/app/components/Atom/Button/Button";
import SelectCarta from "@/app/components/Molecoles/SelectCarta/SelectCarta";

function DataPayment() {
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState("");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const validateForm = () => {
    return (
      cardNumber.length === 16 && // numero della carta di 16 cifre
      selectedCard !== null &&
      cardName.trim() !== "" &&
      expiryDate.trim() !== "" &&
      cvv.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      router.push("/acquista/acquisto_effettuato");
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    // Resetta lo stato di validazione quando uno dei campi cambia
    setIsFormValid(true);
  }, [cardNumber, selectedCard, cardName, expiryDate, cvv]);

  return (
    <>
      <div className={style.main}>
        <Image src={HeroImage} alt="maschera" className={style.img} />
        <h1>Inserisci dati</h1>

        {/* FORM*/}

        <div className={style.modal}>
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.paymentother}>
              <ApplePay />
              <button name="paypal" type="button">
                <Image src={Paypal} alt="paypal" width={30} />
              </button>
              <GooglePayBtn />
            </div>
            <div className={style.separator}>
              <hr className={style.line} />
              <p>OR</p>
              <hr className={style.line} />
            </div>
            <div className={style.cardInfo}>
              <div className={style.input_container}>
                <label className={style.input_label}>Nome sulla carta</label>
                <input
                  className={style.input_field}
                  type="text"
                  placeholder="Inserisci il tuo nome completo"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>
              <div className={style.input_container}>
                <label className={style.input_label}>Numero della carta</label>
                <div>
                  <SelectCarta
                    cardNumber={cardNumber}
                    setCardNumber={setCardNumber}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                  />
                </div>
              </div>
              <div className={style.input_container}>
                <label className={style.input_label}>
                  Data scadenza carta / CVV
                </label>
                <div className={style.split}>
                  <input
                    className={style.input_field}
                    placeholder="01/23"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                  />
                  <input
                    className={style.input_field}
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            {!isFormValid && (
              <p className={style.errorMessage}>
                Per favore, compila tutti i campi.
              </p>
            )}
            <Button text="Avanti" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default DataPayment;
