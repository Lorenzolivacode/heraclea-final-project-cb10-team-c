import React, { useState, useEffect } from "react";
import style from "@/app/(routes)/InitialPage/initialPage.module.scss";
import Toggle from "@/app/components/Atom/Toggle/Toggle";
import Header from "@/app/components/Molecoles/Header/Header";

function InitialPage() {
	const [selectedPage, setSelectedPage] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [showHamburger, setShowHamburger] = useState(false);

	const pages = [
		{
			video: "/heraclea-logo.mp4",
			title: "Heraclea",
		},
		{
			title: "Benvenuti",
			description: "Benvenuti nell'area archeologica di Eraclea Minoa",
			video: "/anfora.mp4",
			label: "ITALIANO",
			label2: "INGLESE",
		},
		{
			title: "Scopri",
			description: "Scopri il museo, il teatro, la necropoli ",
			video: "/search.mp4",
		},
		{
			title: "Acquista",
			description: "Acquista il tuo biglietto di ingresso",
			video: "/two_tickets.mp4",
		},
		{
			title: "Percorsi",
			description: "Scegli il tuo percorso di visita",
			video: "/trekking.mp4",
		},
		{
			title: "Eventi",
			description: "Vivi un'esperienza unica",
			video: "/calendar.mp4",
			label3: "INIZIA",
		},
	];

	const params = [
		"pagina_0",
		"pagina_1",
		"pagina_2",
		"pagina_3",
		"pagina_4",
		"pagina_5",
	];

	useEffect(() => {
		if (currentPage === 0) {
			const timer = setTimeout(() => {
				setCurrentPage(1);
				setSelectedPage("pagina_1");
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [currentPage]);

	const handleToggle = (param: string, index: number) => {
		setSelectedPage(param);
		setCurrentPage(index);
	};

	return (
		<>
			{currentPage !== 0 && (
				<Header
					setShowHamburger={setShowHamburger}
					// showMenu={currentPage === 0}
				/>
			)}

			<main
				className={`${style.main} ${
					currentPage === 0 ? style.initialPage : ""
				}`}
			>
				<div className={style.infoContainer}>
					<h1 className={currentPage === 0 ? style.titleBottom : style.title}>
						{pages[currentPage].title}
					</h1>
					<video
						src={pages[currentPage].video}
						autoPlay
						loop
						muted
						className={style.video}
					></video>

					<p>{pages[currentPage].description}</p>
				</div>
				{currentPage !== 0 && (
					<>
						<div className={style.btnContainer}>
							{currentPage === 1 && (
								<>
									<button>{pages[currentPage].label}</button>
									<button>{pages[currentPage].label2}</button>
								</>
							)}
							{currentPage === 5 && (
								<>
									<button>{pages[currentPage].label3}</button>
								</>
							)}
						</div>
						<div className={style.toggleContainer}>
							{params
								.filter((param, index) => index !== 0) 
								.map((param, index) => (
									<Toggle
										key={param}
										params={param}
										selectedPage={selectedPage}
										onToggle={() => handleToggle(param, index + 1)}
									/>
								))}
						</div>
					</>
				)}
			</main>
		</>
	);
}

export default InitialPage;
