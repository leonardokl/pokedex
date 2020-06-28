import styles from "./pokmon-types.module.scss";

export default function PokemonTypes({ data, size = "normal" }) {
  return (
    <ul
      className={`${styles.wrapper} ${
        size === "small" ? styles.small : styles.normal
      }`}
    >
      {data.map((type) => (
        <li
          key={type.name}
          style={{ backgroundColor: type.color }}
          className={styles.listItem}
        >
          {type.name}
        </li>
      ))}
    </ul>
  );
}
