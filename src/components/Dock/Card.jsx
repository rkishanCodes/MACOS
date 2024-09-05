import * as React from "react";
import styles from "./styles.module.css";

export const Card = ({ src }) => (
  <span className={styles.card}>
    <img className={styles.card__blur} src={src} alt="" />
    <img className={styles.card__img} src={src} alt="" />
  </span>
);
