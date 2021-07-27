import { useSession } from "next-auth/client";
import styles from "../../styles/Index.module.css";
import { useRouter } from "next/router";
import AccessDenied from "../../components/AccessDenied";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const [session, loading] = useSession();
  const [done, setDone] = useState(false);
  const router = useRouter();
  let email;

  //function init
  const newUser = async (email) => {
    if (!done) {
      const data = await fetch(`/api/newUser?email=${email}`);
      const res = await data.json();
      setDone(true);
      router.push("/home");
    }
  };
  //create new user database
  useEffect(() => {
    if (session && !done) {
      email = session.user.email;
      newUser(email);
    }
  }, [session]);

  if (typeof window !== "undefined" && loading)
    return <div className={styles.box}></div>;
  // If no session exists, display access denied message
  if (!session) {
    return (
      <div className={styles.box}>
        <AccessDenied />
      </div>
    );
  }
  return (
    <div>
      <div className={styles.box}>
        <h4>Setting up...</h4>
        {done && (
          <p>
            Set up complete. If not redirected, click{" "}
            <Link href="/home">
              <a>here</a>
            </Link>
            .
          </p>
        )}
        <br />
      </div>
    </div>
  );
}
