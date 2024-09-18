import Image from "next/image";
<<<<<<< HEAD
import Link from "next/link";
import style from "@/app/(routes)/acquista_page/acquisto_terminato/acquistoEffettuato.module.scss";
=======
import style from "@/app/(routes)/acquista_page/acquisto_terminato/acquistoTerminato.module.scss";
>>>>>>> development
import HeroImage from "@/public/assets/vasetti.webp";
import Link from "next/link";
/* import QrCodeGenerator from "@/app/components/Molecoles/QR code/QrCodeGenerator"; */

function Purchase() {
  return (
    <>
      <div className={style.main}>
        <Image src={HeroImage} alt="vasi" priority={true} />
        <h1>Acquisto effettuato con successo</h1>
        <p>
          Per accedere all’area archeologica o agli eventi di Eraclea Minoa ti sarà
          sufficiente scansionare il QR Code
        </p>
<<<<<<< HEAD
        <Link href="/account_user">Vai al tuo account per accedere al biglietto</Link>
=======
        <p>
          Clicca qui per visionare il tuo{" "}
          <Link href={"/account_user"}>QR code</Link>
        </p>
        {/*<QrCodeGenerator />*/}
>>>>>>> development
      </div>
    </>
  );
}

export default Purchase;

