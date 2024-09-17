"use client";
import Image from "next/image";
import styles from "./Home.module.scss";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className={styles.error}>
      <h2>Error</h2>
      <div className={styles.brokenPillarIcon}>
        <Image
          src={"/icons/BrokenPillarTop.svg"}
          width={100}
          height={100}
          alt={"Broken pillar error icon"}
        />
        <Image
          src={"/icons/BrokenPillarBottom.svg"}
          width={100}
          height={100}
          alt={"Broken pillar error icon"}
          style={{ marginTop: "-20px" }}
        />
      </div>
      <p>{error.message}</p>

      <button onClick={reset}>Try Again</button>
    </div>
  );
};

export default error;
