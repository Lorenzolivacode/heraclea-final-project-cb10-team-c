"use client";
import { useRouter } from "next/navigation";
import style from "@/app/(routes)/acquista/acquista.module.scss";
import Button from "@/app/components/Atom/BigButton/BigButton";

function Acquista() {
  const router = useRouter();
  return (
    <>
      <div className={style.container}>
        <h1>Acquista</h1>
        <div className={style.mainButtons}>
          <Button
            text="BIGLIETTO D'INGRESSO"
            onClick={() => router.push("/acquista/calendar")}
          />
          <Button
            text="AUDIOGUIDE"
            onClick={() => router.push("/audioguide")}
          />
          <Button
            text="TEATRI DI PIETRA"
            onClick={() => router.push("/teatri_di_pietra")}
          />
        </div>
      </div>
    </>
  );
}

export default Acquista;
