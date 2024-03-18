import GlobalStyle from "../styles.js";
import { SWRConfig } from "swr";
import Layout from "../components/Layout.js";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [statusText, setStatusText] = useState();

  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <Layout>
        <GlobalStyle />
        <Component
          {...pageProps}
          statusText={statusText}
          setStatusText={setStatusText}
        />
      </Layout>
    </SWRConfig>
  );
}
