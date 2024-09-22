import { QRCode } from "react-qrcode-logo";
import style from "./QrCodeGenerator.module.scss";

interface QrCodeGeneratorProps {
  ticketId: string; // Prop corretta
}

export default function QrCodeGenerator({ ticketId }: QrCodeGeneratorProps) {
  return (
    <div className={style.container}>
      <div className={style.qrCodeContainer}>
        <QRCode value={ticketId} size={100} />
        <p>Il codice del tuo biglietto è: {ticketId}</p>{" "}
      </div>
    </div>
  );
}
