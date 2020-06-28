import styles from "./measure.module.scss";

export default function Measure({ label, value }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label}</div>
      {value}
    </div>
  );
}
