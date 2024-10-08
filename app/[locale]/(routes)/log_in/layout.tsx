import styles from "./LogIn.module.scss";
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
          <Image
            width={80}
            height={80}
            alt="logo"
            src={"/icons/logoSienna.svg"}
          />
        </div>
      </header>
      {children};
    </>
  );
}
