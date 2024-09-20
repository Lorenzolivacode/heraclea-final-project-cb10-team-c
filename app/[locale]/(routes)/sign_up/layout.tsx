import styles from "./SignUp.module.scss";
import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className={styles.header__sign}>
        <div className={styles.icon}>
          <Image fill alt="logo" src={"/icons/logoSienna.svg"} />
        </div>
        {/* <video
          src={"/heraclea-logo-unscreen.gif"}
          autoPlay
          loop
          muted
          className={styles.icon}
        /> */}
      </header>
      {children};
    </>
  );
}
