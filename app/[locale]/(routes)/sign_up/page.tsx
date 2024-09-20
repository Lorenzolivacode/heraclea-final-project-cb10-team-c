"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "@/app/[locale]/firebase/config";
import { useRouter } from "next/navigation";
import style from "./SignUp.module.scss";
import Button from "@/app/[locale]/components/Atom/Button/Button";
import InitialPagemodal from "@/app/[locale]/components/Organism/modalInitialPage/ModalInitialPage";
import { Link } from "@/i18n/routing";

const SignUp: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [cognome, setCognome] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Hook per la registrazione
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nome || !cognome || !email || !password) {
      setError("Tutti i campi sono obbligatori");
      return;
    }

    if (password.length < 6) {
      setError("La password deve essere lunga almeno 6 caratteri");
      return;
    }

    setError("");

    try {
      console.log("Tentativo di registrazione con email e password:", {
        email,
        password,
      });

      const res = await createUserWithEmailAndPassword(email, password);

      console.log("Risultato della registrazione:", res);

      if (res && res.user) {
        await updateProfile(res.user, {
          displayName: `${nome} ${cognome}`,
        });
      }

      alert("Registrazione completata!");
      router.push("/log_in");

      // Reset dei campi
      setNome("");
      setCognome("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error instanceof Error) {
        // Stampa il messaggio di errore nella console
        console.error("Errore nella registrazione:", error.message);

        // Verifica errori comuni
        if (error.message.includes("auth/email-already-in-use")) {
          setError(
            "Email già registrata. Vai su <a href='/log_in' class='link'>Login</a> per accedere."
          );
        } else if (error.message.includes("auth/invalid-email")) {
          setError("L'email fornita non è valida.");
        } else if (error.message.includes("auth/weak-password")) {
          setError("La password deve essere lunga almeno 6 caratteri.");
        } else {
          setError("Errore durante la registrazione. Riprova.");
        }
      } else {
        setError("Errore sconosciuto durante la registrazione.");
      }
    }
  };

  return (
    <>
      <InitialPagemodal />
      <div className={style.container}>
        <h1 className={style.title}>Sign In</h1>
        <form onSubmit={handleSubmit} className={style.form}>
          <div>
            <input
              placeholder="Nome"
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={style.input}
              required
            />
            {error && !nome && (
              <p className={style.error}>Il nome è obbligatorio</p>
            )}
          </div>
          <div>
            <input
              placeholder="Cognome"
              id="cognome"
              type="text"
              value={cognome}
              onChange={(e) => setCognome(e.target.value)}
              className={style.input}
              required
            />
            {error && !cognome && (
              <p className={style.error}>Il cognome è obbligatorio</p>
            )}
          </div>
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
            {error && !email && (
              <p className={style.error}>La email è obbligatoria</p>
            )}
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
            {error && password.length < 6 && (
              <p className={style.error}>
                La password deve essere lunga almeno 6 caratteri
              </p>
            )}
          </div>
          <div className={style.button}>
            <Button text="Registrati" type="submit" />
          </div>
          <p className={style.text}>
            Sei già registrato? Fai{" "}
            <Link href="/log_in" className={style.a}>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
