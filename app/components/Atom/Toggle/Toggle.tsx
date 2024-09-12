"use client"
import React, { useState } from "react";
function Toggle() {
	const [selectedColor, setSelectedColor] = useState("ColorBlack");

	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedColor(event.target.value);
	};

	return (
		<fieldset className="flex flex-wrap gap-3">
			<legend className="sr-only">Color</legend>

			{/* Black Color Option */}
			<label
				htmlFor="ColorBlack"
				className={`block size-5 cursor-pointer rounded-full bg-ivory shadow-sm ${
					selectedColor === "ColorBlack"
						? "ring-2 ring-ivory ring-offset-2"
						: ""
				}`}
			>
				<input
					type="radio"
					name="ColorOption"
					value="ColorBlack"
					id="ColorBlack"
					className="sr-only"
					checked={selectedColor === "ColorBlack"}
					onChange={handleColorChange}
				/>
				<span className="sr-only">Texas Tea</span>
			</label>

			{/* Red Color Option */}
			<label
				htmlFor="ColorRed"
				className={`block size-5 cursor-pointer rounded-full bg-ivory shadow-sm ${
					selectedColor === "ColorRed"
						? "ring-2 ring-ivory ring-offset-2"
						: ""
				}`}
			>
				<input
					type="radio"
					name="ColorOption"
					value="ColorRed"
					id="ColorRed"
					className="sr-only"
					checked={selectedColor === "ColorRed"}
					onChange={handleColorChange}
				/>
				<span className="sr-only">Fiesta Red</span>
			</label>

			{/* Blue Color Option */}
			<label
				htmlFor="ColorBlue"
				className={`block size-5 cursor-pointer rounded-full bg-ivory shadow-sm ${
					selectedColor === "ColorBlue"
						? "ring-2 ring-ivory ring-offset-2"
						: ""
				}`}
			>
				<input
					type="radio"
					name="ColorOption"
					value="ColorBlue"
					id="ColorBlue"
					className="sr-only"
					checked={selectedColor === "ColorBlue"}
					onChange={handleColorChange}
				/>
				<span className="sr-only">Cobalt Blue</span>
			</label>

			{/* Gold Color Option */}
			<label
				htmlFor="ColorGold"
				className={`block size-5 cursor-pointer rounded-full bg-ivory shadow-sm ${
					selectedColor === "ColorGold"
						? "ring-2 ring-ivory ring-offset-2"
						: ""
				}`}
			>
				<input
					type="radio"
					name="ColorOption"
					value="ColorGold"
					id="ColorGold"
					className="sr-only"
					checked={selectedColor === "ColorGold"}
					onChange={handleColorChange}
				/>
				<span className="sr-only">Goldtop</span>
			</label>
		</fieldset>
	);
}

export default Toggle;
