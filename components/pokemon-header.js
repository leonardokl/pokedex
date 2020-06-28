import { getId } from "../utils";
import styles from "./pokemon-header.module.scss";

export default function PokemonHeader({ data }) {
  return (
    <div className={styles.header}>
      <h2>{data.name}</h2>
      <span>{`#${getId(data.id)}`}</span>
    </div>
  );
}
