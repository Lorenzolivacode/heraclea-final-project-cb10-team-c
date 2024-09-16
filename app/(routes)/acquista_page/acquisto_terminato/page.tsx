import Image from "next/image";
import style from "@/app/(routes)/acquista_page/acquisto_terminato/acquistoEffettuato.module.scss";
import HeroImage from "@/public/assets/vasetti.webp";
import QrCodeGenerator from "@/app/components/Molecoles/QR code/QrCodeGenerator";
function Purchase() {
  return (
    <>
      <div className={style.main}>
        <Image src={HeroImage} alt="vasi" priority={true} />
        <h1>Acquisto effettuato</h1>
        <p>
          Per accedere all’area archeologica di Eraclea Minoa ti sarà
          sufficiente scansionare il QR Code
        </p>
        <p>come trovare il codice QR</p>
        {/*<QrCodeGenerator />*/}
      </div>
    </>
  );
}

export default Purchase;
