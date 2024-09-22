import "./globals.css";
/* import ProtectedLayout from "@/app/(protected)/layout"; */
import ClientWrapper from "@/app/[locale]/components/Organism/ClientWrapper/ClientWrapper";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { unstable_setRequestLocale } from "next-intl/server";
import { relative } from "path";
import Head from "next/head";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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
    <>
      <Head>
        <link rel="icon" href="/icons/logoSienna-circle.svg" />
        <title>HeracleApp</title>
      </Head>
      <html lang={locale}>
        <body>
          <NextIntlClientProvider messages={messages}>
            <ClientWrapper>{children}</ClientWrapper>
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  );
}
