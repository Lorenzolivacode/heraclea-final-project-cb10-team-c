import "./globals.css";
import ClientWrapper from "@/app/[locale]/components/Organism/ClientWrapper/ClientWrapper";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "HeracleApp",
  icons: {
    icon: "/icons/logoSienna-circle.svg",
  },
};

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
