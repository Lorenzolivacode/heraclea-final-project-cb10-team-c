"use client";
import { useState } from "react";
import { QRCode } from "react-qrcode-logo";

export default function QrCodeGenerator() {
	const [randomValue, setRandomValue] = useState("");

	const generateRandomValue = () => {
		const randomString = Math.random().toString(36).substring(2, 15);
		setRandomValue(randomString);
	};

	return (
		<div style={{ textAlign: "center", marginTop: "50px" }}>
			<h1>Random QR Code Generator</h1>
			<button
				onClick={generateRandomValue}
				style={{ padding: "30px", fontSize: "16px", cursor: "pointer" }}
			>
				Fai il check-in
			</button>
			{randomValue && (
				<div style={{ marginTop: "20px" }}>
					<QRCode value={randomValue} size={100} />
					<p>Il codice del tuo biglietto è: {randomValue}</p>
				</div>
			)}
		</div>
	);
}
