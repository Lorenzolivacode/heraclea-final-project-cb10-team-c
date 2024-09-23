"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "@/app/[locale]/firebase/config";
import { useRouter } from "@/i18n/routing";
import style from "./SignUp.module.scss";
import Button from "@/app/[locale]/components/Atom/Button/Button";
import InitialPagemodal from "@/app/[locale]/components/Organism/modalInitialPage/ModalInitialPage";
import { Link } from "@/i18n/routing";
import { saveUserData } from "@/app/[locale]/firebase/database";
import { useTranslations } from "next-intl";
import Toast from "../../components/Atom/Toast/Toast";

const SignUp: React.FC = () => {
  const t = useTranslations("SignUp");
  const [nome, setNome] = useState<string>("");
  const [cognome, setCognome] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isLoginFailure, setIsLoginFailure] = useState(false);

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nome || !cognome || !email || !password) {
      setError(t("error_required_fields"));
      return;
    }

    if (password.length < 6) {
      setError(t("error_password_length"));
      return;
    }

    setError("");

    try {
      const res = await createUserWithEmailAndPassword(email, password);

      if (res && res.user) {
        await updateProfile(res.user, {
          displayName: `${nome} ${cognome}`,
        });

        const userData = {
          firstName: nome,
          lastName: cognome,
          email: res.user.email,
          paymentInfo: {
            cardName: "",
            cardNumber: "",
            expiryDate: "",
            paymentMethod: "",
            selectedCard: "",
          },
        };
        await saveUserData(res.user.uid, userData);

        alert(t("registration_success"));
        setIsLoginSuccess(true);
        setTimeout(() => {
          router.push("/log_in");
        }, 4200);

        setNome("");
        setCognome("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("auth/email-already-in-use")) {
          setError(
            t("error_email_in_use", {
              loginLink: `<a href='/log_in' class='link'>${t("login")}</a>`,
            })
          );
        } else if (error.message.includes("auth/invalid-email")) {
          setError(t("error_invalid_email"));
        } else if (error.message.includes("auth/weak-password")) {
          setError(t("error_password_length"));
        } else {
          setError(t("error_registration"));
        }
      } else {
        setError(t("error_unknown"));
      }
    }
  };

  return (
    <>
      <InitialPagemodal />

      <Toast
        message={t("loginSuccess")}
        type="success"
        isOpen={isLoginSuccess}
        onClose={() => setIsLoginSuccess(false)}
      />
      <div className={style.container}>
        <h1 className={style.title}>{t("sign_up")}</h1>
        <form onSubmit={handleSubmit} className={style.form}>
          <div>
            <input
              placeholder={t("first_name")}
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={style.input}
              required
            />
            {error && !nome && (
              <p className={style.error}>{t("error_first_name_required")}</p>
            )}
          </div>
          <div>
            <input
              placeholder={t("last_name")}
              id="cognome"
              type="text"
              value={cognome}
              onChange={(e) => setCognome(e.target.value)}
              className={style.input}
              required
            />
            {error && !cognome && (
              <p className={style.error}>{t("error_last_name_required")}</p>
            )}
          </div>
          <div>
            <input
              placeholder={t("email")}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={style.input}
              required
            />
            {error && !email && (
              <p className={style.error}>{t("error_email_required")}</p>
            )}
          </div>
          <div>
            <input
              placeholder={t("password")}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={style.input}
              required
            />
            {error && password.length < 6 && (
              <p className={style.error}>{t("error_password_length")}</p>
            )}
          </div>
          <div className={style.button}>
            <Button text={t("sign_up")} type="submit" />
          </div>
          <p className={style.text}>
            {t("already_registered")}{" "}
            <Link href="/log_in" className={style.a}>
              {t("login")}
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
