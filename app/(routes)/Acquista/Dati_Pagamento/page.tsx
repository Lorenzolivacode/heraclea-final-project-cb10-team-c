"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import style from "@/app/(routes)/acquista/dati_pagamento/pagamento.module.scss";
import HeroImage from "@/public/assets/maschera.webp";
import ApplePay from "@/app/components/Atom/ApplepayBtn/ApplePayBtn";
import GooglePayBtn from "@/app/components/Atom/GooglePayBtn/GooglePayBtn";
import Paypal from "@/public/icons/pagamenti/paypal.svg";
import Button from "@/app/components/Atom/Button/Button";
import SelectCarta from "@/app/components/Molecoles/SelectCarta/SelectCarta";

function DataPayment() {
  const router = useRouter();
  return (
    <>
      <div className={style.main}>
        <Image src={HeroImage} alt="maschera" className={style.img} />
        <h1>Inserisci dati</h1>

        {/* FORM*/}

        <div className={style.modal}>
          <form className={style.form}>
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
                />
              </div>
              <div className={style.input_container}>
                <label className={style.input_label}>Numero della carta</label>
                <div>
                  <SelectCarta />
                </div>
              </div>
              <div className={style.input_container}>
                <label className={style.input_label}>
                  Data scadenza carta / CVV
                </label>
                <div className={style.split}>
                  <input className={style.input_field} placeholder="01/23" />
                  <input className={style.input_field} placeholder="CVV" />
                </div>
              </div>
            </div>
            <Button
              text="Avanti"
              onClick={() => router.push("/acquista/acquisto_effettuato")}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default DataPayment;
