import Link from "next/link";
import styles from "./Home.module.scss";

export default function NotFound() {
  return (
    <div className={styles.error}>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
