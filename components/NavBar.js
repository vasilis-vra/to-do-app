//bootstrap imports
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { HouseDoor, Inbox, Calendar3, Stack } from "react-bootstrap-icons";
//next imports
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
//styles import
import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  const [session, loading] = useSession();
  return (
    <>
      {session && (
        <Navbar bg="dark" variant="dark" className="navbar p-1">
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Nav className="me-auto ml-1">
            <Link href="/home" passHref>
              <Nav.Link className="nav-item">
                <HouseDoor className="m-1" />
                <span className={styles.small}>Today</span>
              </Nav.Link>
            </Link>
            <Link href="/inbox" passHref>
              <Nav.Link className="nav-item">
                <Inbox className="m-1" />
                <span className={styles.small}>Inbox</span>
              </Nav.Link>
            </Link>
            <Link href="/future" passHref>
              <Nav.Link className="nav-item">
                <Calendar3 className="m-1" />
                <span className={styles.small}>Future</span>
              </Nav.Link>
            </Link>
            <Link href="/projects" passHref>
              <Nav.Link className="nav-item">
                <Stack className="m-1" />
                <span className={styles.small}>Projects</span>
              </Nav.Link>
            </Link>
          </Nav>
          <Nav className="ml-auto">
            <button
              className={"btn btn-outline-secondary " + styles.navButton}
              onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
            >
              Sign out
            </button>
          </Nav>
        </Navbar>
      )}
      {!session && (
        <Navbar
          bg="dark"
          variant="dark"
          className="navbar p-1 d-flex justify-content-end"
        >
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Nav className="ml-auto">
            <button
              className={"btn btn-outline-secondary " + styles.navButton}
              onClick={() =>
                signIn(null, { callbackUrl: "http://localhost:3000/home" })
              }
            >
              Sign in
            </button>
          </Nav>
        </Navbar>
      )}
    </>
  );
}
