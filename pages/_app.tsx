import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { ServicesContext, services } from '../client/services';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ServicesContext.Provider value={services}>
      <CssBaseline />
      <Component {...pageProps} />
    </ServicesContext.Provider>
  );
};

export default MyApp;
