import localFont from "next/font/local";
import "./globals.css";
/* import ProtectedLayout from "@/app/(protected)/layout"; */
import ClientWrapper from "@/app/[locale]/components/Organism/ClientWrapper/ClientWrapper";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* export function generateStaticParams() {
  const locales = routing.locales; // ['en', 'it']
  const paths = [
    { route: "chi_siamo" },
    { route: "contatti" },
    // Aggiungi tutte le pagine che desideri gestire
  ];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      locale,
      route: path.route,
    }))
  );
} */

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClientWrapper>{children}</ClientWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
