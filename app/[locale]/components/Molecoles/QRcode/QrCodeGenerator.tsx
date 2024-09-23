import { QRCode } from "react-qrcode-logo";
import style from "./QrCodeGenerator.module.scss";

interface QrCodeGeneratorProps {
  ticketId: string;
}

const QrCodeGenerator = ({ ticketId }: QrCodeGeneratorProps) => {
  // Funzione per generare un ID unico
  const generateUniqueId = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return `${Date.now()}-${array[0]}`;
  };

  // Genera l'ID unico
  const uniqueId = generateUniqueId();

  return (
    <div className={style.container}>
      <div className={style.qrCodeContainer}>
        <QRCode value={uniqueId} size={100} />
        <p>Il codice del tuo biglietto è: {ticketId}</p>
        <p>{uniqueId}</p>
      </div>
    </div>
  );
};

export default QrCodeGenerator;
