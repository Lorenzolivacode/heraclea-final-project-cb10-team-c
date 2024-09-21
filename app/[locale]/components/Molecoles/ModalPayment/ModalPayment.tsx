"use client";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import style from "../../../(routes)/acquista_page/dati_transazione/pagamento.module.scss";
import ApplePay from "@/app/[locale]/components/Atom/ApplepayBtn/ApplePayBtn";
import GooglePayBtn from "@/app/[locale]/components/Atom/GooglePayBtn/GooglePayBtn";
import Paypal from "@/public/icons/pagamenti/paypal.svg";
import Button from "@/app/[locale]/components/Atom/Button/Button";
import SelectCarta from "@/app/[locale]/components/Molecoles/SelectCarta/SelectCarta";

function ModalPayment() {
  const [cardNumber, setCardNumber] = useState("");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [cardName, setCardName] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(true);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const userPaymentRef = ref(db, `users/${user.uid}/paymentInfo`);

      if (paymentMethod !== null && paymentMethod !== "Carta") {
        // Se è stato selezionato un metodo di pagamento alternativo (Apple Pay, Google Pay, PayPal)
        const paymentInfo = {
          paymentMethod,
        };

        set(userPaymentRef, paymentInfo)
          .then(() => {
            console.log("Metodo di pagamento salvato con successo.");
            router.push("/acquista_page/acquisto_terminato");
          })
          .catch((error) => {
            console.error(
              "Errore durante il salvataggio del metodo di pagamento:",
              error
            );
          });
      } else if (validateForm()) {
        // Se è stata selezionata la carta di credito e il form è valido
        const paymentInfo = {
          cardName,
          cardNumber,
          expiryDate,
          selectedCard,
          paymentMethod: "Carta",
        };

        set(userPaymentRef, paymentInfo)
          .then(() => {
            console.log("Dati di pagamento salvati con successo.");
            router.push("/acquista_page/acquisto_terminato");
          })
          .catch((error) => {
            console.error("Errore durante il salvataggio dei dati:", error);
          });
      } else {
        setIsFormValid(false);
      }
    } else {
      console.log("Utente non autenticato.");
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const validateForm = () => {
    if (paymentMethod !== null && paymentMethod !== "Carta") {
      // Se un metodo di pagamento alternativo è stato selezionato, non c'è bisogno di validare il form della carta
      return true;
    }
    return (
      cardNumber.length === 16 &&
      selectedCard !== null &&
      cardName.trim() !== "" &&
      expiryDate.trim() !== "" &&
      cvv.trim() !== ""
    );
  };

  return (
    <>
      <div className={style.margin}>
        <div className={style.modal}>
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.paymentother}>
              <ApplePay onClick={() => handlePaymentMethodChange("ApplePay")} />
              <button
                name="paypal"
                type="button"
                onClick={() => handlePaymentMethodChange("PayPal")}
              >
                <Image src={Paypal} alt="paypal" width={30} />
              </button>
              <GooglePayBtn
                onClick={() => handlePaymentMethodChange("GooglePay")}
              />
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
                  placeholder="Inserisci il nome sulla carta"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
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
                  />
                  <input
                    className={style.input_field}
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              text="Paga adesso"
              className={!isFormValid ? style.invalid : ""}
            />
            {!isFormValid && <p className={style.error}>Dati non validi</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalPayment;
