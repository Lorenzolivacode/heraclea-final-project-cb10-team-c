import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <link rel="icon" href="/icons/logoSienna-circle.svg" />
        <title>HeracleApp</title>
      </Head>
      {children}
    </>
  );
}
