import React from "react";
import { Github, Linkedin } from "react-bootstrap-icons";
import styles from "../styles/Footer.module.css";

export default function Footer(props) {
  var date = new Date();
  return (
    <div className={styles.footer}>
      <p>created by Vasileios Vrachoritis</p>
      <p>
        <a href="https://www.linkedin.com/in/v-vrachoritis">
          <Linkedin />
        </a>
        <a href="https://www.github.com/vasilis-vra">
          <Github />
        </a>
      </p>
      <p> &copy; To-Do App {date.getFullYear()}</p>
    </div>
  );
}
