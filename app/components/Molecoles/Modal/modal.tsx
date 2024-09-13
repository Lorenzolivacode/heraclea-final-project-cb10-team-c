import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
	isVisible: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, children }) => {
	if (!isVisible) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
