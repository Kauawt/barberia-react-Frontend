// src/pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* Layout Global ou Barra de Navegação, etc. */}
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
