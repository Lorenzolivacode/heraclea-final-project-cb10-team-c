"use client";
import { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import style from "./QrCodeGenerator.module.scss";

export default function QrCodeGenerator() {
	const [randomValue, setRandomValue] = useState("");

	const generateRandomValue = () => {
		const randomString = Math.random().toString(36).substring(2, 15);
		setRandomValue(randomString);
	};

	return (
		<div className={style.container}>
			<button
				onClick={generateRandomValue}
				className={style.generateButton}
			>
				Scansiona il QR Code
			</button>
			{randomValue && (
				<div className={style.qrCodeContainer}>
					<QRCode value={randomValue} size={100} />
					<p>Il codice del tuo biglietto è: {randomValue}</p>
				</div>
			)}
		</div>
	);
}

