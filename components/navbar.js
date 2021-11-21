import Link from "next/link";

import styles from "../styles/components/navbar.module.css";

export default function Navbar() {
  return (
      <ul className={styles.navbar} id="navbar">
        <li className={styles.item}>
        <Link href="/">Ash</Link>
        </li>
        <li className={styles.item}>
          <Link href="#stuff">stuff™</Link>
        </li>
        <li className={styles.item}>
          <Link href="#contact">Contact</Link>
        </li>
      </ul>
  );
}
