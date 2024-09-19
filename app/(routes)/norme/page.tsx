import style from "/app/(routes)/norme/norme.module.scss";
function Norme() {
  return (
    <main className={style.main}>
      <h1 className={style.title}>Norme</h1>
      <div className={style.container}>
        <p>
          È consentito l’ingresso gratuito, tramite esibizione, al personale
          delle biglietterie, di un documento attestante una delle seguenti
          condizioni
        </p>
      </div>
      <div className={style.container}>
        <img src="/icons/norme-icons/people.svg" alt="people" width={35} height={35} />
        <p>
          Ai visitatori che non abbiano compiuto il diciottesimo anno di età, i
          visitatori che abbiano meno di dodici anni di età devono essere
          accompagnati da un maggiorenne.
        </p>
      </div>
      <div className={style.container}>
        <img src="/icons/norme-icons/Assistive_Technology.svg" alt="Assistive_logo" width={35} height={35} />
        <p>
          Ai portatori di handicap e ad un loro familiare o ad altro
          accompagnatore che dimostri la propria appartenenza a servizi di
          assistenza socio-sanitaria (Decreto Ministeriale n. 239 del 20 aprile
          2006)
        </p>
      </div>
    </main>
  );
}

export default Norme;
