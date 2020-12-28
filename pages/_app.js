import React, {useEffect, Fragment} from 'react';
import { Provider } from 'react-redux'
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import store from '../store'


const MyApp = ({ Component, pageProps }) => {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Todos App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </Fragment>
  )
}

export default MyApp
