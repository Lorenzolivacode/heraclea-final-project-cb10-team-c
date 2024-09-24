"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/[locale]/firebase/config";
import style from "./LogIn.module.scss";
import Button from "@/app/[locale]/components/Atom/Button/Button";
import { Link, useRouter } from "@/i18n/routing";
import Toast from "../../components/Atom/Toast/Toast";
import { useTranslations } from "next-intl";

const SignIn: React.FC = () => {
  const t = useTranslations("SignIn");

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
      const res = await signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      if (res && res.user) {
        setIsLoginSuccess(true);
        setTimeout(() => {
          router.push(`/`);
        }, 4200);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log("errore");

      if (error instanceof Error) {
        setIsLoginFailure(true);
        console.error("Errore durante l'accesso:", error.message);

        if (error.message.includes("auth/user-not-found")) {
          setError(t("errorUserNotFound"));
          setShowSignUpRedirect(true);
        } else if (error.message.includes("auth/wrong-password")) {
          setError(t("errorWrongPassword"));
        } else if (error.message.includes("auth/invalid-email")) {
          setError(t("errorInvalidEmail"));
        } else {
          setError(t("errorGeneric"));
        }
      } else {
        setError(t("errorUnknown"));
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className={style.container}>
      <Toast
        message={error}
        type="error"
        isOpen={isLoginFailure}
        onClose={() => setIsLoginFailure(false)}
      />
      <Toast
        message={t("loginSuccess")}
        type="success"
        isOpen={isLoginSuccess}
        onClose={() => setIsLoginSuccess(false)}
      />
      <h1 className={style.title}>{t("loginTitle")}</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <div>
          <input
            placeholder={t("emailPlaceholder")}
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
            placeholder={t("passwordPlaceholder")}
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
                text={t("signUpButton")}
                onClick={() => router.push("/sign_up")}
              />
            )}
          </div>
        )}
        <div className={style.button}>
          <Button text={t("loginButton")} type="submit" />
        </div>

        <p className={style.text}>
          {t("notRegistered")}{" "}
          <Link href="/sign_up" className={style.a}>
            {t("signUpLink")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
