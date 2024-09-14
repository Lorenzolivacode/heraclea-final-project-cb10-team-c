"use client";
import { useRouter } from "next/navigation";
import style from "@/app/(routes)/Acquista/acquista.module.scss";
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
            onClick={() => router.push("/Acquista/Calendar")}
          />
          <Button
            text="AUDIOGUIDE"
            onClick={() => router.push("/audioguide")}
          />
          <Button
            text="TEATRI DI PIETRA"
            onClick={() => router.push("/Teatri_di_Pietra")}
          />
        </div>
      </div>
    </>
  );
}

export default Acquista;
