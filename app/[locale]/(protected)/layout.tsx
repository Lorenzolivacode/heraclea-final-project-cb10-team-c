"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/[locale]/firebase/config";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

const locale = useLocale() as "it" | "en"; // Ottieni la lingua corrente
const unprotectedRoutes = [`/sign_up`, `/log_in`];

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null); // Stato per verificare se l'utente è registrato
  const router = useRouter();
  const pathname = usePathname();
  const db = getDatabase(); // Inizializza il database

  useEffect(() => {
    if (loading) return; // Attendere che Firebase determini lo stato di autenticazione

    if (!user && !unprotectedRoutes.includes(pathname)) {
      // Se l'utente non è loggato e sta cercando di accedere a una rotta protetta
      router.push(`/log_in`, { locale }); // aggiunto locale per far leggere al router di i18n la lingua, NON FUNZIONA
      return;
    }

    if (user) {
      // Verifica se l'utente è registrato nel database Firebase
      const userRef = ref(db, `users/${user.uid}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // L'utente è registrato nel database
            setIsRegistered(true);
          } else {
            // L'utente non è registrato, mandalo a sign_up
            setIsRegistered(false);
            router.push(`/sign_up`, { locale });
          }
        })
        .catch((error) => {
          console.error("Errore nel controllare l'utente nel database:", error);
        });
    }
  }, [user, loading, pathname, db, router]);

  if (loading || isRegistered === null) {
    // Mostra una schermata di caricamento mentre Firebase controlla lo stato dell'utente
    return <p>Caricamento...</p>;
  }

  // Se l'utente è registrato e loggato, mostra il contenuto della pagina
  return <>{children}</>;
};

export default ProtectedLayout;
