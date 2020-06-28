import styles from "./list.module.scss";

export default function List({ label, value }) {
  return (
    <div className={styles.wrapper}>
      <div>{label}</div>
      <ul>
        {value.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
