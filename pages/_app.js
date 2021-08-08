import { Provider } from "next-auth/client";
import Navigation from "../components/layout/navigation";
import Header from "../components/layout/header";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
      <Navigation />
    </Provider>
  );
}
