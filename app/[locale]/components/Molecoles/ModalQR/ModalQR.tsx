import QrCodeGenerator from "../QRcode/QrCodeGenerator";
import styles from "./ModalQR.module.scss";

interface Ticket {
  id: string;
  type: string;
  quantity: number;
  price: number;
}

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  ticket?: Ticket | null;
}

const ModalQR: React.FC<ModalProps> = ({ isVisible, onClose, ticket }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times; {/* Simbolo della X */}
        </button>
        {ticket && (
          <>
            <h2>{ticket.type} QR Code</h2>
            <QrCodeGenerator ticketId={ticket.id} />
          </>
        )}
      </div>
    </div>
  );
};

export default ModalQR;
