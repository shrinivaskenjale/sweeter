import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { FiLogOut, FiHome, FiUser, FiPlus } from "react-icons/fi";
import c from "./navigation.module.css";
const Navigation = (props) => {
  const [session, sessionloading] = useSession();
  const clickHandler = (event) => {
    signOut({ callbackUrl: process.env.APP_URL });
  };

  if (sessionloading) return null;

  if (!sessionloading && !session) {
    return null;
  }

  return (
    <div className={c.navigation}>
      <ul className={c.navLinks}>
        <li className={c.navLink}>
          <Link href="/home">
            <a>
              <FiHome />
            </a>
          </Link>
        </li>
        <li className={c.navLink}>
          <Link href={`/${session.user._id}`}>
            <a>
              <FiUser />
            </a>
          </Link>
        </li>
        <li className={c.navLink}>
          <Link href="/compose/sweet">
            <a>
              <FiPlus />
            </a>
          </Link>
        </li>
        <li className={c.navLink}>
          <button onClick={clickHandler}>
            <FiLogOut />
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Navigation;
