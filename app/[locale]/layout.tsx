import "./globals.css";
import ClientWrapper from "@/app/[locale]/components/Organism/ClientWrapper/ClientWrapper";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";

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
