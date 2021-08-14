import { signIn } from "next-auth/client";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";
import c from "../styles/welcome.module.css";
const WelcomePage = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [session, sessionloading] = useSession();
  const router = useRouter();

  if (sessionloading) return <p className="loading">Loading...</p>;

  if (!sessionloading && session) {
    router.replace("/home");
    return null;
  }

  return (
    <section className={c.welcome}>
      <h2>Sweeter helps you connect and share with the people in your life.</h2>
      <h3>To continue, log in to Sweeter.</h3>
      <button
        className={c.loginBtn}
        onClick={() => {
          setIsSigningIn(true);
          signIn("google", {
            callbackUrl: process.env.NEXT_PUBLIC_APP_URL + "/home",
          });
        }}
      >
        <span className={c.googleLogo}>
          <img src="/google.png" alt="google logo" />
        </span>
        {isSigningIn ? "Logging in..." : "Continue with Google"}
      </button>
    </section>
  );
};

export default WelcomePage;
