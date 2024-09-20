"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/[locale]/firebase/config";
import style from "./LogIn.module.scss";
import Button from "@/app/[locale]/components/Atom/Button/Button";
import { Link, useRouter } from "@/i18n/routing";
import Toast from "../../components/Atom/Toast/Toast";

const SignIn: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showSignUpRedirect, setShowSignUpRedirect] = useState<boolean>(false);

  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isLoginFailure, setIsLoginFailure] = useState(false);

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setShowSignUpRedirect(false);

    try {
      // Tentativo di accesso con email e password
      const res = await signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      if (res && res.user) {
        // Accesso riuscito
        /* alert("Accesso effettuato!"); */
        setIsLoginSuccess(true);

        const displayName = res.user.displayName || "Utente";
        const uid = res.user.uid;

        // Reindirizza alla pagina dell'account e passa il nome utente come query string
        setTimeout(() => {
          router.push(
            `/account_user?userName=${encodeURIComponent(
              displayName
            )}&uid=${uid}`
          );
        }, 3100);
      }
    } catch (error) {
      console.log("errore");

      if (error instanceof Error) {
        setIsLoginFailure(true);
        console.error("Errore durante l'accesso:", error.message);

        // Gestione degli errori specifici
        if (error.message.includes("auth/user-not-found")) {
          setIsLoginFailure(true);
          setError(
            "Email non trovata. Verifica di avere un account o registrati."
          );
          setShowSignUpRedirect(true);
        } else if (error.message.includes("auth/wrong-password")) {
          setIsLoginFailure(true);
          setError("Password errata. Riprova.");
        } else if (error.message.includes("auth/invalid-email")) {
          setIsLoginFailure(true);
          setError("L'email fornita non è valida.");
        } else {
          setIsLoginFailure(true);
          setError("Errore durante l'accesso. Riprova.");
        }
      } else {
        setIsLoginFailure(true);
        setError("Errore sconosciuto durante l'accesso.");
      }
    }

    // Reset dei campi
    setEmail("");
    setPassword("");
  };

  return (
    <div className={style.container}>
      {isLoginFailure && (
        <Toast
          message={error}
          type="error"
          onClose={() => setIsLoginFailure(false)}
        />
      )}
      {isLoginSuccess && (
        <Toast
          message="Accesso effettuato!"
          type="success"
          onClose={() => setIsLoginSuccess(false)}
        />
      )}
      <h1 className={style.title}>Log In</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <div>
          <input
            placeholder="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={style.input}
            required
          />
        </div>
        <div>
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={style.input}
            required
          />
        </div>
        {error && (
          <div className={style.errorContainer}>
            <p className={style.error}>{error}</p>
            {showSignUpRedirect && (
              <Button
                text="Registrati"
                onClick={() => router.push("/sign_up")}
              />
            )}
          </div>
        )}
        <div className={style.button}>
          <Button text="Accedi" type="submit" />
        </div>

        <p className={style.text}>
          Non sei registrato? Fai{" "}
          <Link href="/sign_up" className={style.a}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
