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
  const [isFormValid, setIsFormValid] = useState(true);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getDatabase();
        const userPaymentRef = ref(db, `users/${user.uid}/paymentInfo`);

        const paymentInfo = {
          cardName,
          cardNumber,
          expiryDate,
          selectedCard,
        };

        // Salva i dati nel database
        set(userPaymentRef, paymentInfo)
          .then(() => {
            console.log("Dati di pagamento salvati con successo.");
            router.push("/acquista_page/acquisto_terminato");
          })
          .catch((error) => {
            console.error("Errore durante il salvataggio dei dati:", error);
          });
      } else {
        console.log("Utente non autenticato.");
      }
    } else {
      setIsFormValid(false);
    }
  };

  const validateForm = () => {
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
                  placeholder="Inserisci il nome sulla carta"
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
