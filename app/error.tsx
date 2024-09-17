"use client";
import styles from "./Home.module.scss";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className={styles.error}>
      <p>{error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  );
};

export default error;
