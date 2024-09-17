import Link from "next/link";
import styles from "./Home.module.scss";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h2>Page Not Found</h2>
      <p>Could not find requested page</p>
      <p>
        Return{" "}
        <Link className={styles.linkHome} href="/">
          Home
        </Link>
      </p>
    </div>
  );
}
