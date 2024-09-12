"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import style from "@/app/(routes)/SignIn/SignIn.module.scss";
import Button from "@/app/components/Atom/Button/Button";
import Link from "next/link";

const SignIn: React.FC = () => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nome || !cognome || !email || !password) {
      setError("Tutti i campi sono obbligatori");
      return;
    }
    setError("");

    localStorage.setItem("nome", nome);
    localStorage.setItem("cognome", cognome);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Registrazione completata!");

    setNome("");
    setCognome("");
    setEmail("");
    setPassword("");
  };

  return (
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
            <p className={style.error}>Il cognonome è obbligatorio</p>
          )}
        </div>
        <div>
          <input
            placeholder="Email"
            id="email"
            type="text"
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
          {error && !password && (
            <p className={style.error}>La password è obbligatoria</p>
          )}
        </div>
        <div className={style.button}>
          <Button text="Registrati" />
        </div>
        <p className={style.text}>
          Sei già registrato? fai{" "}
          <Link href="/login" className={style.a}>
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
