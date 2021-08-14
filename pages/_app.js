import "../styles/globals.css";
import { Provider } from "next-auth/client";
import Navigation from "../components/layout/navigation";
import Header from "../components/layout/header";
import Meta from "../components/meta/meta";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Meta title="Sweeter" />
      <Header />
      <Component {...pageProps} />
      <Navigation />
    </Provider>
  );
}
