"use client";
import { useState } from "react";
import style from "@/app/(routes)/SignIn/SignIn.module.scss";
import Button from "@/app/components/Atom/Button/Button";

const SignIn: React.FC = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Accesso effettuato!");

    setEmail("");
    setPassword("");
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Log In</h1>
      <form onSubmit={handleSubmit} className={style.form}>
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
        <div className={style.button}>
          <Button text="Accedi" />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
