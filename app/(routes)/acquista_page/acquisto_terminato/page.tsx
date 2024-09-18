import Image from "next/image";
import style from "@/app/(routes)/acquista_page/acquisto_terminato/acquistoTerminato.module.scss";
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
          Per accedere all’area archeologica di Eraclea Minoa ti sarà
          sufficiente scansionare il QR Code
        </p>
        <p>
          Clicca qui per visionare il tuo{" "}
          <Link href={"/account_user"}>QR code</Link>
        </p>
        {/*<QrCodeGenerator />*/}
      </div>
    </>
  );
}

export default Purchase;
