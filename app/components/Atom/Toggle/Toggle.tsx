import React from "react";

interface ToggleProps {
	selectedPage: string;
	onToggle: (params: string) => void;
	params: string;
}

function Toggle({ selectedPage, onToggle, params }: ToggleProps) {
	const isActive = selectedPage === params;

	return (
		<fieldset className="flex flex-wrap gap-3">
			<legend className="sr-only">params</legend>
			<label
				htmlFor={params}
				className={`block size-5 cursor-pointer rounded-full shadow-lg ${
					isActive ? "ring-4 ring-sienna ring-offset-3" : ""
				}`}
				style={{ backgroundColor: isActive ? "sienna" : "white" }}
				onClick={() => onToggle(params)}
			>
				<input
					type="radio"
					name="ColorOption"
					value={params}
					id={params}
					className="sr-only"
					checked={isActive}
					onChange={() => onToggle(params)}
				/>
			</label>
		</fieldset>
	);
}

export default Toggle;
