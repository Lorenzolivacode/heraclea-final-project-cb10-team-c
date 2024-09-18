import Image from "next/image";
import Link from "next/link";
import style from "@/app/(routes)/acquista_page/acquisto_terminato/acquistoEffettuato.module.scss";
import HeroImage from "@/public/assets/vasetti.webp";
/* import QrCodeGenerator from "@/app/components/Molecoles/QR code/QrCodeGenerator"; */

function Purchase() {
  return (
    <>
      <div className={style.main}>
        <Image src={HeroImage} alt="vasi" priority={true} />
        <h1>Acquisto effettuato</h1>
        <p>
          Per accedere all’area archeologica o agli eventi di Eraclea Minoa ti sarà
          sufficiente scansionare il QR Code
        </p>
        <Link href="/account_user">Vai al tuo account per accedere al biglietto</Link>
      </div>
    </>
  );
}

export default Purchase;

