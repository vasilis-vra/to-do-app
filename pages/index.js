import { signIn, signOut, useSession } from "next-auth/client";
import styles from "../styles/Index.module.css";
import { CardChecklist } from "react-bootstrap-icons";
import Link from "next/link";

export default function Index() {
  const [session, loading] = useSession();

  return (
    <div>
      <div className={styles.box}>
        <CardChecklist Style="font-size:100px;" />
        <br />
        <h2>Organize your everyday tasks and projects!</h2>
        <br />
        {!session && (
          <button
            className="btn btn-danger btn-lg"
            onClick={() =>
              signIn(null, { callbackUrl: "http://localhost:3000/home" })
            }
          >
            Get Started
          </button>
        )}
        {session && (
          <Link href="/home" passHref>
            <button className="btn btn-danger btn-lg">Get Started</button>
          </Link>
        )}
      </div>
    </div>
  );
}
