import React from "react";
import style from "@/app/(routes)/InitialPage/initialPage.module.scss";
import Toggle from "@/app/components/Atom/Toggle/Toggle";
function InitialPage() {
  return (
    <main className={style.main}>
      <div className={style.infoContainer}>
        <h1>Benvenuti</h1>
        <img src="" alt="icon" />
        <p>Benvenuti nell’area archeologica di Eraclea Minoa</p>
      </div>
      <div className={style.btnContainer}>
        <button>ITALIANO</button>
        <button>ENGLISH</button>
      </div>
      <div className={style.toggleContainer}>
        <Toggle />
      </div>
    </main>
  );
}

export default InitialPage;
