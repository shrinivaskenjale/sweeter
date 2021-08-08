import { signIn } from "next-auth/client";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import c from "../styles/welcome.module.css";
const WelcomePage = () => {
  const [session, sessionloading] = useSession();
  const router = useRouter();

  if (sessionloading) return null;

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
        onClick={() =>
          signIn("google", { callbackUrl: process.env.APP_URL + "/home" })
        }
      >
        <span>
          <img src="/google.png" alt="google logo" />
        </span>
        Continue with Google
      </button>
    </section>
  );
};

export default WelcomePage;
