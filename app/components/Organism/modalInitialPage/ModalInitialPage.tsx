"use client";
import React, { useState, useEffect } from "react";
import style from "@/app/components/Organism/modalInitialPage/ModalInitialPage.module.scss";
import Toggle from "@/app/components/Atom/Toggle/Toggle";
import Modal from "@/app/components/Molecoles/Modal/modal";
import Button from "@/app/components/Atom/Button/Button";
function InitialPagemodal() {
	const [selectedPage, setSelectedPage] = useState<string>("pagina_0");
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [isModalVisible, setIsModalVisible] = useState(true);

	const pages = [
		{
			video: "/heraclea-logo-unscreen.gif",
			title: "HERACLEA",
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
			video: "/tickets.mp4",
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
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [currentPage]);

	const closeModal = () => {
		setIsModalVisible(false);
		setCurrentPage(0);
	};

	const handleButtonClick = () => {
		if (currentPage === 5) {
			closeModal();
		}
	};

	const handleToggle = (param: string, index: number) => {
		setSelectedPage(param);
		setCurrentPage(index);
	};

	return (
		<>
			{/* Modale che parte automaticamente */}
			<Modal isVisible={isModalVisible} onClose={closeModal}>
				<main
					className={`${style.main} ${
						currentPage === 0 ? style.initialPage : ""
					}`}
				>
					<div className={style.infoContainer}>
						<h1 className={currentPage === 0 ? style.titleBottom : style.title}>
							{pages[currentPage].title}
						</h1>
						{currentPage === 0 ? (
							<img
								src={pages[0].video}
								alt="Heraclea Logo"
								className={style.gif}
							/>
						) : (
							<video
								src={pages[currentPage].video}
								autoPlay
								muted
								className={style.video}
							></video>
						)}

						<p>{pages[currentPage].description}</p>
					</div>

					{/* Rendering condizionale per i bottoni specifici per pagina */}
					{currentPage !== 0 && (
						<>
							<div className={style.btnContainer}>
								{currentPage === 1 && (
									<>
										<Button text="ITALIANO" />
										<Button text="ENGLISH" />
									</>
								)}
								{currentPage === 5 && (
									<>
										{/* Bottone che chiude la modale */}
										<Button text="INIZIA" onClick={handleButtonClick} />
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
			</Modal>
		</>
	);
}

export default InitialPagemodal;
