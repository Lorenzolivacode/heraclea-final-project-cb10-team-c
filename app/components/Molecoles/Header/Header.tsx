"use client";

import { Dispatch, SetStateAction, useState } from "react";
import style from "@/app/components/Molecoles/Header/Header.module.scss";
import Hamburger from "../HamburgerMenu/HamburgerMenu";
import Link from "next/link";

interface HeaderProps {
	setShowHamburger: Dispatch<SetStateAction<boolean>>;
	showMenu: boolean;
}

const Header = ({ setShowHamburger, showMenu }: HeaderProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
		setShowHamburger(!isMenuOpen);
	};

	return (
		<div className={style.nav}>
			<div></div>
			<div className={style.logoContainer}>
				<Link href="/">
					<img src="/icons/logoSienna.svg" alt="Logo" width={69} height={69} />
				</Link>
			</div>
			{showMenu && (
				<span className={style.span}>
					<Hamburger
						active={isMenuOpen}
						setActive={toggleMenu}
						className={""}
					/>
				</span>
			)}
		</div>
	);
};

export default Header;
